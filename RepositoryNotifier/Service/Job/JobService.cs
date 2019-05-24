using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.Extensions.Logging;
using RepositoryNotifier.DTO;
using RepositoryNotifier.Persistence.Job;

namespace RepositoryNotifier.Service.Job
{
    public class JobService : IJobService
    {
        private IJobDao JobDao { get; }
        private ILogger<JobService> _logger { get; set; }

        public JobService(IJobDao p_jobDao, ILogger<JobService> p_logger)
        {
            JobDao = p_jobDao;
            _logger = p_logger;
        }

        public Persistence.Job.Job CreateJob(CreateRepositoryInspectorJobTO p_repositoryInspectorJob)
        {

            Persistence.Job.Job job = new Persistence.Job.Job()
            {
                Frequency = p_repositoryInspectorJob.Frequency,
                Repositories = p_repositoryInspectorJob.Repositories,
                SearchKeywords = p_repositoryInspectorJob.SearchKeywords,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                Status = Constants.Status.INIT,
                Email = p_repositoryInspectorJob.Email,
                Username = p_repositoryInspectorJob.Username
            };


                JobDao.AddJob(job);



            return GetJob(p_repositoryInspectorJob.Username, p_repositoryInspectorJob.Frequency);
        }

        public bool DeleteJob(string p_username, JobFrequency p_frequency)
        {
            return JobDao.DeleteJob(p_username, p_frequency);
        }

        public IEnumerable<string> GetCommonKeywords(int p_amount)
        {
            IList<Persistence.Job.Job> jobs = JobDao.GetAllJobs().ToList();

            IList<IList<string>> allKeywords = jobs.Select(p_job => p_job.SearchKeywords).ToList();

            int total = 0;
            foreach (int count in allKeywords.Select(list => list.Count).ToList())
            {
                total += count;
            }
            total = allKeywords.Count * total;

            IDictionary<string, int> keywordsWithCount = new Dictionary<string, int>();
            foreach (IList<string> keywordList in allKeywords)
            {
                foreach (string keyword in keywordList)
                {
                    if (!keywordsWithCount.ContainsKey(keyword))
                    {
                        keywordsWithCount.Add(keyword, 0);
                    }
                    else
                    {
                        keywordsWithCount[keyword]++;
                    }
                }
            }

            keywordsWithCount.OrderBy(p_keyword => p_keyword.Value).Take(p_amount);
            IEnumerable<string> commonKeywords = keywordsWithCount.Select(p_keyword => p_keyword.Key).ToList();
            return commonKeywords;
        }

        public bool UpdateJob(UpdateRepositoryInspectorJobTO p_repositoryInspectorJob)
        {
            Persistence.Job.Job job = JobDao.GetJob(p_repositoryInspectorJob.Username, p_repositoryInspectorJob.Frequency);
            job.Repositories = p_repositoryInspectorJob.Repositories;
            job.SearchKeywords = p_repositoryInspectorJob.SearchKeywords;
            job.Email = p_repositoryInspectorJob.Email;
            job.UpdatedAt = DateTime.Now;

            return JobDao.UpdateJob(job);
        }

        public Persistence.Job.Job GetJob(string p_username, JobFrequency p_frequency)
        {           return JobDao.GetJob(p_username, p_frequency);
        }

        public bool JobExists(string p_username, JobFrequency p_frequency)
        {
            return JobDao.GetJob(p_username, p_frequency) != null;
        }

        public IEnumerable<Persistence.Job.Job> GetAllJobs(JobFrequency p_frequency)
        {
            return JobDao.GetAllJobs().Where(p_job => p_job.Frequency == p_frequency);
        }

        public IEnumerable<Persistence.Job.Job> GetAllJobs(string p_username)
        {
            return JobDao.GetAllJobs().Where(p_job => p_job.Username.Equals(p_username)).ToList();
        }

        public IEnumerable<Persistence.Job.Job> GetAllJobs()
        {
            return JobDao.GetAllJobs();
        }

        public bool UpdateJob(Persistence.Job.Job p_job)
        {
            return JobDao.UpdateJob(p_job);
        }

        public IList<JobResult> GetJobResults(string username, JobFrequency p_frequency)
        {
            return JobDao.GetJob(username, p_frequency).Results;
        }
    }
}