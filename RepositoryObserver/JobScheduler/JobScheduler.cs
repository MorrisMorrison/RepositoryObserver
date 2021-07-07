using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using System.Timers;
using Microsoft.Extensions.Logging;
using Octokit;
using RepositoryNotifier.Constants;
using RepositoryNotifier.Persistence;
using RepositoryNotifier.Persistence.Job;
using RepositoryNotifier.Service;
using RepositoryNotifier.Service.Email;
using RepositoryNotifier.Service.Github;
using RepositoryNotifier.Service.Job;
using RepositoryNotifier.Service.SMS;

namespace RepositoryNotifier.JobScheduler
{
    public class JobScheduler : IJobScheduler
    {
        private IJobService _jobService { get; }
        private IJobFrequencyService _frequencyService { get; }
        private IGithubApiService _githubApiService { get; }
        private IEmailService _emailService { get; }
        private IMobileNotificationService _mobileNotificationService { get; set; }
        private IList<JobFrequency> _frequencies { get; set; }
        private bool _initRunDone { get; set; }
        private ILogger<JobScheduler> _logger { get; set; }
        private IList<Timer> _timers { get; set; }
        private Timer _initTimer { get; set; }

        public JobScheduler(IJobService p_jobService,
            IGithubApiService p_githubApiService,
            IJobFrequencyService p_frequencyService,
            IEmailService p_emailService,
            IMobileNotificationService p_mobileNotificationService,
            ILogger<JobScheduler> p_logger)
        {
            _jobService = p_jobService;
            _frequencyService = p_frequencyService;
            _githubApiService = p_githubApiService;
            _frequencies = _frequencyService.GetFrequencies();
            _emailService = p_emailService;
            _logger = p_logger;
            _mobileNotificationService = p_mobileNotificationService;
        }


        public async Task Run()
        {
            // execute all tasks at first startup
            // if no tasks have been found, create a Timer set to the smallest frequency
            // and look for tasks again

            _logger.LogInformation("Initialize RepositoryInspectorJobScheduler Run().");


            IList<Job> repositoryInspectorJobs = _jobService.GetAllSchedulerJobs().ToList();
            if (repositoryInspectorJobs == null || repositoryInspectorJobs.Count < 1)
            {
                if (_initTimer == null)
                {
                    double interval = (long)_frequencies.First() * 30000;
                    Timer initTimer = new Timer(interval);
                    initTimer.Elapsed += async (sender, e) => await Run();
                    initTimer.AutoReset = false;
                    _initTimer = initTimer;
                    _initTimer.Enabled = true;

                    _logger.LogInformation("No RepositoryInspectorJobs found. Setting up InitTimer {InitTimer} to run in {Interval} s.", initTimer, interval / 30000);
                }
                return;
            }
            if (!_initRunDone)
            {
                _logger.LogInformation("RepositoryInspectorJobScheduler starting init run.");
                foreach (Job p_repositoryInspectorJob in repositoryInspectorJobs)
                {
                    ExecuteJob(p_repositoryInspectorJob);
                }
                _initRunDone = true;
            }

            _initTimer = null;

            foreach (JobFrequency frequency in _frequencies)
            {
                // create a Timer for every frequency and bind Handler to it
                Timer timer = new Timer((long)frequency * 60000);
                timer.Elapsed += async (sender, e) => await ExecuteJobs(frequency);
                timer.AutoReset = true;
                timer.Enabled = true;
            }
        }


        public async Task ExecuteJobs(JobFrequency p_frequency)
        {
            IList<Job> repositoryInspectorJobs = _jobService.GetAllJobs(p_frequency).ToList();

            foreach (Job job in repositoryInspectorJobs)
            {
                await ExecuteJob(job);
            }
        }

        public async Task ExecuteJob(Job p_job)
        {
            IList<SearchCodeResult> searchResults = new List<SearchCodeResult>();

            searchResults = await _githubApiService.FindKeywordsInRepository(p_job);

            if (searchResults == null || searchResults.Count < 1) return;

            _logger.LogInformation("Found Keyword for RepositoryInspectorJob: {RepositoryInspectorJob} SearchResult{SearchResult}", p_job, searchResults);


            p_job.Status = RepositoryNotifier.Constants.Status.OK;
            p_job.LastExecutedAt = DateTime.Now;

            foreach (SearchCodeResult searchCodeResult in searchResults)
            {
                if (searchCodeResult.Items.Count < 1) continue;
                
                Persistence.Job.Repository repository = new Persistence.Job.Repository
                {
                    Id = searchCodeResult.Items.FirstOrDefault().Repository.Id,
                    Name = searchCodeResult.Items.FirstOrDefault().Repository.Name,
                    Url = searchCodeResult.Items.FirstOrDefault().Repository.Url
                };

                foreach (SearchCode searchCode in searchCodeResult.Items)
                {
                    JobResult result = new JobResult()
                    {
                        Name = searchCode.Name,
                        HtmlUrl = searchCode.HtmlUrl,
                        GitUrl = searchCode.GitUrl,
                        Path = searchCode.Path,
                        Repository = repository,
                        Sha = searchCode.Sha,
                        CreatedAt = DateTime.Now
                    };

                    if (p_job.Results == null){
                        p_job.Results = new List<JobResult>();
                    }
                    p_job.Results.Add(result);
                }
            }
            _jobService.UpdateJob(p_job);

            if (p_job.EmailNotificationEnabled)
            {
                // _emailService.SendNotificationMail(p_job.Username, p_job.Email, searchResults);
            }

            if (p_job.SmsNotificationEnabled)
            {
//                await _mobileNotificationService.CreateSMSNotification("+4917647106363", MobileNotificationConstants.NOTIFICATION_TEMPLATE, null);
            }

            if (p_job.WhatsappNotificationEnabled)
            {
//                await _mobileNotificationService.CreateWhatsappNotification("+4917647106363", MobileNotificationConstants.NOTIFICATION_TEMPLATE, null);

            }
            
        }

    }
}