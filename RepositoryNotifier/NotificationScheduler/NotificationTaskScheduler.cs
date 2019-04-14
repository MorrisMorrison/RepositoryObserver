using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using System.Timers;
using Microsoft.Extensions.Logging;
using Octokit;
using RepositoryNotifier.Persistence;
using RepositoryNotifier.Service;
using RepositoryNotifier.Service.Github;

namespace RepositoryNotifier.TaskScheduler
{
    public class NotificationTaskScheduler: INotificationTaskScheduler
    {
        private INotificationTaskCrudService _notificationTaskCrudService { get; }
        private IFrequencyService _frequencyService { get;  }
        private IGithubApiService _githubApiService { get; }
        private IEmailService _emailService { get; }
        private IList<Frequency> _frequencies { get; set; }
        private bool _initRunDone { get; set; }
       private ILogger<NotificationTaskScheduler> _logger { get; set; }
        private IList<Timer> _timers { get; set; }
        private Timer _initTimer { get; set; }

        public NotificationTaskScheduler(INotificationTaskCrudService p_notificationTaskCrudService, IGithubApiService p_githubApiService, IFrequencyService p_frequencyService, IEmailService p_emailService, ILogger<NotificationTaskScheduler> p_logger)
        {
            _notificationTaskCrudService = p_notificationTaskCrudService;
            _frequencyService = p_frequencyService;
            _githubApiService = p_githubApiService;
            _frequencies = _frequencyService.GetFrequencies();
            _emailService = p_emailService;
           _logger = p_logger;
        }

        
        // TODO implement logging 
        public async Task Run()
        {
            // execute all tasks at first startup
            // if no tasks have been found, create a Timer set to the smallest frequency
            // and look for tasks again

           _logger.LogInformation("Initialize NotificationTaskScheduler Run().");


            IList<NotificationTask> notifications = _notificationTaskCrudService.GetAllNotificationTasks().ToList();
            if (notifications == null || notifications.Count < 1)
            {
                if (_initTimer == null)
                {
                    double interval = (long) _frequencies.First() * 30000;
                    Timer initTimer = new Timer(interval);
                    initTimer.Elapsed += async (sender, e) => await Run();
                    initTimer.AutoReset = false;
                    _initTimer = initTimer;
                    _initTimer.Enabled = true;

                   _logger.LogInformation("No NotificationTasks found. Setting up InitTimer {InitTimer} to run in {Interverl} s.", initTimer, interval/30000 );
                }
                return;
            }
            if (!_initRunDone)
            {
                _logger.LogInformation("NotificationTaskScheduler starting init run.");
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
            IList<SearchCodeResult> searchResults = await _githubApiService.FindPasswords(p_notificationTask);
            
            if (searchResults == null || searchResults.Count < 1) return;

            _logger.LogInformation("Found Keyword for NotificationTask: {NotificationTask} SearchResult{SearchResult}", p_notificationTask, searchResults);


            p_notificationTask.Status = RepositoryNotifier.Constants.Status.OK;
            _notificationTaskCrudService.UpdateStatus(p_notificationTask);
            _notificationTaskCrudService.UpdateLastExecuted(p_notificationTask);
            _emailService.SendNotificationMail(p_notificationTask.Username, p_notificationTask.Email, searchResults);
        }
        
    }
}