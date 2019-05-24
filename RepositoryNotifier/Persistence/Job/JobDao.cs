using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoDB.Driver;
using RepositoryNotifier.Constants;
using RepositoryNotifier.Helper;

namespace RepositoryNotifier.Persistence.Job
{
    public class JobDao : IJobDao
    {
        private IMongoDatabase _database { get; set; }
        private ILogger<JobDao> _logger { get; set; }

        public JobDao(IDbConnectionProvider p_dbConnectionProvider, ILogger<JobDao> p_logger)
        {
            _database = p_dbConnectionProvider.GetDatabaseConnection();
            _logger = p_logger;
        }


        public void AddJob(Job p_job)
        {
            IMongoCollection<Job> repositoryInspectorJobs = _database.GetCollection<Job>(DBConnectionConstants.JOB_COLLECTION);
            repositoryInspectorJobs.InsertOne(p_job);
        }


        public Job GetJob(string p_username, JobFrequency p_frequency)
        {
            IMongoCollection<Job> repositoryInspectorJobs = _database.GetCollection<Job>(DBConnectionConstants.JOB_COLLECTION);
            Job job = repositoryInspectorJobs.Find(p_task => p_task.Username.Equals(p_username) && p_task.Frequency == p_frequency).FirstOrDefault();
            return job;
        }


        public IEnumerable<Job> GetAllJobs()
        {
            IList<Job> RepositoryInspectors = new List<Job>();
            IMongoCollection<Job> taskCollection = _database.GetCollection<Job>(DBConnectionConstants.JOB_COLLECTION);
            RepositoryInspectors = taskCollection.Find(FilterDefinition<Job>.Empty).ToList();

            return RepositoryInspectors;
        }

        public IEnumerable<Job> GetAllJobs(string p_username)
        {
            IList<Job> RepositoryInspectors = new List<Job>();
            IMongoCollection<Job> taskCollection = _database.GetCollection<Job>(DBConnectionConstants.JOB_COLLECTION);
            FilterDefinition<Job> filterDefinition = Builders<Job>.Filter.Where(p_job => p_job.Username.Equals(p_username));
            List<Job> jobs = taskCollection.Find(filterDefinition).ToList();

            return jobs;
        }

        public bool UpdateJob(Job p_job)
        {
            IMongoCollection<Job> repositoryInspectorJobs = _database.GetCollection<Job>(DBConnectionConstants.JOB_COLLECTION);
            var updateDef = Builders<Job>.Update.Set(p_task => p_task.Email, p_job.Email)
                                                                   .Set(p_task => p_task.Repositories, p_job.Repositories)
                                                                   .Set(p_task => p_task.SearchKeywords, p_job.SearchKeywords)
                                                                   .Set(p_task => p_task.LastExecutedAt, p_job.LastExecutedAt)
                                                                   .Set(p_task => p_task.Status, p_job.Status)
                                                                   .Set(p_task => p_task.Results, p_job.Results)
                                                                   .Set(p_task => p_task.UpdatedAt, p_job.UpdatedAt);

            UpdateResult result = repositoryInspectorJobs.UpdateOne(p_task => p_task.Username == p_job.Username && p_task.Frequency == p_job.Frequency, updateDef);

            if (!result.IsAcknowledged) _logger.LogError("Could not update RepositoryInspector: {RepositoryInspector} Result: {Result}", p_job, result);

            return result.IsAcknowledged;
        }



        public bool DeleteJob(string p_username ,JobFrequency p_frequency)
        {
            IMongoCollection<Job> repositoryInspectorJobs = _database.GetCollection<Job>(DBConnectionConstants.JOB_COLLECTION);
            DeleteResult result = repositoryInspectorJobs.DeleteOne(p_item => p_item.Username.Equals(p_username) && p_item.Frequency == p_frequency);

            if (!result.IsAcknowledged) _logger.LogError("Could not delete Username: {Username} Result: {Result}", p_username, result);

            return result.IsAcknowledged;
        }

    }
}