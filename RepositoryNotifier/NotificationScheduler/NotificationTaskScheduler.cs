using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using System.Timers;
using Octokit;
using RepositoryNotifier.GithubAPI;
using RepositoryNotifier.Persistence;
using RepositoryNotifier.Service;

namespace RepositoryNotifier.TaskScheduler
{
    public class NotificationTaskScheduler: INotificationTaskScheduler
    {
        private INotificationTaskCrudService _notificationTaskCrudService { get; }
        private IFrequencyService _frequencyService { get;  }
        private IGithubApiAdapter _githubApiAdapter { get; }
        private IEmailManager _emailManager { get; }
        private IList<Frequency> _frequencies { get; set; }
        private bool _initRunDone { get; set; }
//        private ILogger _logger { get; }
        private IList<Timer> _timers { get; set; }
        private Timer _initTimer { get; set; }

        public NotificationTaskScheduler(INotificationTaskCrudService p_notificationTaskCrudService, IGithubApiAdapter p_githubApiAdapter, IFrequencyService p_frequencyService, IEmailManager p_emailManager)
        {
            _notificationTaskCrudService = p_notificationTaskCrudService;
            _frequencyService = p_frequencyService;
            _githubApiAdapter = p_githubApiAdapter;
            _frequencies = _frequencyService.GetFrequencies();
            _emailManager = p_emailManager;
//            _logger = p_logger;
        }

        
        // TODO implement logging 
        public async Task Run()
        {
            // execute all tasks at first startup
            // if no tasks have been found, create a Timer set to the smallest frequency
            // and look for tasks again
            IList<NotificationTask> notifications = _notificationTaskCrudService.GetAllNotificationTasks().ToList();
            if (notifications == null || notifications.Count < 1)
            {
                if (_initTimer == null)
                {
                    Debug.Print("---------- Initialize NotificationTask ----------");
                    Timer initTimer = new Timer((long) _frequencies.First() * 30000);
                    initTimer.Elapsed += async (sender, e) => await Run();
                    initTimer.AutoReset = false;
                    _initTimer = initTimer;
                    _initTimer.Enabled = true;
                }
                return;
            }
            if (!_initRunDone)
            {
                foreach (NotificationTask p_notification in notifications)
                {
                    ExecuteNotificationTask(p_notification);
                }
                _initRunDone = true;
            }

            _initTimer = null;

            foreach (Frequency frequency in _frequencies)
            {
                // create a Timer for every frequency and bind Handler to it
                Timer timer = new Timer((long) frequency * 60000 );
                timer.Elapsed += async (sender, e) => await ExecuteNotificationTasksByFrequency(frequency);
                timer.AutoReset = true;
                timer.Enabled = true;
            }
        }


        public async Task ExecuteNotificationTasksByFrequency(Frequency p_frequency)
        {
            IList<NotificationTask> tasksByFrequency = _notificationTaskCrudService.GetNotificationTaskByFrequency(p_frequency).ToList();
            
            foreach (NotificationTask task in tasksByFrequency)
            {
                ExecuteNotificationTask(task);
            }
        }
        

        public async Task ExecuteNotificationTask(NotificationTask p_notificationTask)
        {
            Debug.Print("---------- Execute Task ----------");
            IList<SearchCodeResult> searchResults = await _githubApiAdapter.FindPasswords(p_notificationTask);
//            _logger.Log(Log Level.Information, "Execute Task | Find Search Passwords ", searchResults);
            
            if (searchResults == null || searchResults.Count < 1) return;
            p_notificationTask.Status = RepositoryNotifier.Constants.Status.OK;
            _notificationTaskCrudService.UpdateStatus(p_notificationTask);
            _notificationTaskCrudService.UpdateLastExecuted(p_notificationTask);
            _emailManager.SendNotificationMail(p_notificationTask.Username, p_notificationTask.Email, searchResults);
        }
        
    }
}