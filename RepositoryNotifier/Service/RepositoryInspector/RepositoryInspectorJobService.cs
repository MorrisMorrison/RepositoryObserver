using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.Extensions.Logging;
using RepositoryNotifier.DTO;
using RepositoryNotifier.Persistence.RepositoryInspectorJob;

namespace RepositoryNotifier.Service.RepositoryInspector
{
    public class RepositoryInspectorJobService : IRepositoryInspectorJobService
    {
        private IRepositoryInspectorJobDao _repositoryInspectorJobDao { get; }
        private ILogger<RepositoryInspectorJobService> _logger { get; set; }

        public RepositoryInspectorJobService(IRepositoryInspectorJobDao p_repositoryInspectorJobDao, ILogger<RepositoryInspectorJobService> p_logger)
        {
            _repositoryInspectorJobDao = p_repositoryInspectorJobDao;
            _logger = p_logger;
        }

        public RepositoryInspectorJob CreateRepositoryInspectorJob(CreateRepositoryInspectorJobTO p_repositoryInspectorJob)
        {

            RepositoryInspectorJob job = new RepositoryInspectorJob()
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


                _repositoryInspectorJobDao.CreateRepositoryInspectorJob(job);



            return GetRepositoryInspectorJob(p_repositoryInspectorJob.Username, p_repositoryInspectorJob.Frequency);
        }

        public bool DeleteRepositoryInspectorJob(string p_username, RepositoryInspectorJobFrequency p_frequency)
        {
            return _repositoryInspectorJobDao.DeleteRepositoryInspectorJob(p_username, p_frequency);
        }

        public IEnumerable<string> GetCommonKeywords(int p_amount)
        {
            IList<RepositoryInspectorJob> jobs = _repositoryInspectorJobDao.GetAllRepositoryInspectorJobs().ToList();

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

        public bool UpdateRepositoryInspectorJob(UpdateRepositoryInspectorJobTO p_repositoryInspectorJob)
        {
            RepositoryInspectorJob job = _repositoryInspectorJobDao.GetRepositoryInspectorJob(p_repositoryInspectorJob.Username, p_repositoryInspectorJob.Frequency);
            job.Repositories = p_repositoryInspectorJob.Repositories;
            job.SearchKeywords = p_repositoryInspectorJob.SearchKeywords;
            job.Email = p_repositoryInspectorJob.Email;
            job.UpdatedAt = DateTime.Now;

            return _repositoryInspectorJobDao.UpdateRepositoryInspectorJob(job);
        }

        public RepositoryInspectorJob GetRepositoryInspectorJob(string p_username, RepositoryInspectorJobFrequency p_frequency)
        {           return _repositoryInspectorJobDao.GetRepositoryInspectorJob(p_username, p_frequency);
        }

        public bool RepositoryInspectorJobExists(string p_username, RepositoryInspectorJobFrequency p_frequency)
        {
            return _repositoryInspectorJobDao.GetRepositoryInspectorJob(p_username, p_frequency) != null;
        }

        public IEnumerable<RepositoryInspectorJob> GetAllRepositoryInspectorJobs(RepositoryInspectorJobFrequency p_frequency)
        {
            return _repositoryInspectorJobDao.GetAllRepositoryInspectorJobs().Where(p_job => p_job.Frequency == p_frequency);
        }

        public IEnumerable<RepositoryInspectorJob> GetAllRepositoryInspectorJobs(string p_username)
        {
            return _repositoryInspectorJobDao.GetAllRepositoryInspectorJobs().Where(p_job => p_job.Username.Equals(p_username)).ToList();
        }

        public IEnumerable<RepositoryInspectorJob> GetAllRepositoryInspectorJobs()
        {
            return _repositoryInspectorJobDao.GetAllRepositoryInspectorJobs();
        }

        public bool UpdateRepositoryInspectorJob(RepositoryInspectorJob p_repositoryInspectorJob)
        {
            return _repositoryInspectorJobDao.UpdateRepositoryInspectorJob(p_repositoryInspectorJob);
        }
    }
}