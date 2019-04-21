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
using RepositoryNotifier.Persistence.RepositoryInspectorJob;
using RepositoryNotifier.Service;
using RepositoryNotifier.Service.Email;
using RepositoryNotifier.Service.Github;
using RepositoryNotifier.Service.RepositoryInspector;

namespace RepositoryNotifier.RepositoryInspectorJobScheduler
{
    public class RepositoryInspectorJobScheduler: IRepositoryInspectorJobScheduler
    {
        private IRepositoryInspectorJobService _repositoryInspectorService { get; }
        private IRepositoryInspectorJobFrequencyService _frequencyService { get;  }
        private IGithubApiService _githubApiService { get; }
        private IEmailService _emailService { get; }
        private IList<RepositoryInspectorJobFrequency> _frequencies { get; set; }
        private bool _initRunDone { get; set; }
       private ILogger<RepositoryInspectorJobScheduler> _logger { get; set; }
        private IList<Timer> _timers { get; set; }
        private Timer _initTimer { get; set; }

        public RepositoryInspectorJobScheduler(IRepositoryInspectorJobService p_notificationTaskCrudService, IGithubApiService p_githubApiService, IRepositoryInspectorJobFrequencyService p_frequencyService, IEmailService p_emailService, ILogger<RepositoryInspectorJobScheduler> p_logger)
        {
            _repositoryInspectorService = p_notificationTaskCrudService;
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

           _logger.LogInformation("Initialize RepositoryInspectorJobScheduler Run().");


            IList<RepositoryInspectorJob> repositoryInspectorJobs = _repositoryInspectorService.GetAllRepositoryInspectorJobs().ToList();
            if (repositoryInspectorJobs == null || repositoryInspectorJobs.Count < 1)
            {
                if (_initTimer == null)
                {
                    double interval = (long) _frequencies.First() * 30000;
                    Timer initTimer = new Timer(interval);
                    initTimer.Elapsed += async (sender, e) => await Run();
                    initTimer.AutoReset = false;
                    _initTimer = initTimer;
                    _initTimer.Enabled = true;

                   _logger.LogInformation("No RepositoryInspectorJobs found. Setting up InitTimer {InitTimer} to run in {Interval} s.", initTimer, interval/30000 );
                }
                return;
            }
            if (!_initRunDone)
            {
                _logger.LogInformation("RepositoryInspectorJobScheduler starting init run.");
                foreach (RepositoryInspectorJob p_repositoryInspectorJob in repositoryInspectorJobs)
                {
                    ExecuteRepositoryInspectorJob(p_repositoryInspectorJob);
                }
                _initRunDone = true;
            }

            _initTimer = null;

            foreach (RepositoryInspectorJobFrequency frequency in _frequencies)
            {
                // create a Timer for every frequency and bind Handler to it
                Timer timer = new Timer((long) frequency * 60000 );
                timer.Elapsed += async (sender, e) => await ExecuteRepositoryInspectorJobs(frequency);
                timer.AutoReset = true;
                timer.Enabled = true;
            }
        }


        public async Task ExecuteRepositoryInspectorJobs(RepositoryInspectorJobFrequency p_frequency)
        {
            IList<RepositoryInspectorJob> repositoryInspectorJobs = _repositoryInspectorService.GetAllRepositoryInspectorJobs(p_frequency).ToList();
            
            foreach (RepositoryInspectorJob job in repositoryInspectorJobs)
            {
                await ExecuteRepositoryInspectorJob(job);
            }
        }
        
        public async Task ExecuteRepositoryInspectorJob(RepositoryInspectorJob p_repositoryInspectorJob)
        {
            IList<SearchCodeResult> searchResults = await _githubApiService.FindPasswords(p_repositoryInspectorJob);
            
            if (searchResults == null || searchResults.Count < 1) return;

            _logger.LogInformation("Found Keyword for RepositoryInspectorJob: {RepositoryInspectorJob} SearchResult{SearchResult}", p_repositoryInspectorJob, searchResults);


            p_repositoryInspectorJob.Status = RepositoryNotifier.Constants.Status.OK;
            p_repositoryInspectorJob.LastExecutedAt = DateTime.Now;
            _repositoryInspectorService.UpdateRepositoryInspectorJob(p_repositoryInspectorJob);

            _emailService.SendNotificationMail(p_repositoryInspectorJob.Username, p_repositoryInspectorJob.Email, searchResults);
        }
        
    }
}