using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoDB.Driver;
using RepositoryNotifier.Constants;
using RepositoryNotifier.Helper;

namespace RepositoryNotifier.Persistence.RepositoryInspectorJob
{
    public class RepositoryInspectorJobDao : IRepositoryInspectorJobDao
    {
        private IMongoDatabase _database { get; set; }
        private ILogger<RepositoryInspectorJobDao> _logger { get; set; }

        public RepositoryInspectorJobDao(IDbConnectionProvider p_dbConnectionProvider, ILogger<RepositoryInspectorJobDao> p_logger)
        {
            _database = p_dbConnectionProvider.GetDatabaseConnection();
            _logger = p_logger;
        }


        public void CreateRepositoryInspectorJob(RepositoryInspectorJob p_repositoryInspectorJob)
        {
            IMongoCollection<RepositoryInspectorJob> repositoryInspectorJobs = _database.GetCollection<RepositoryInspectorJob>(DBConnectionConstants.REPOSITORY_INSPECTOR_JOB_COLLECTION);
            repositoryInspectorJobs.InsertOne(p_repositoryInspectorJob);
        }


        public RepositoryInspectorJob GetRepositoryInspectorJob(string p_username, RepositoryInspectorJobFrequency p_frequency)
        {
            IMongoCollection<RepositoryInspectorJob> repositoryInspectorJobs = _database.GetCollection<RepositoryInspectorJob>(DBConnectionConstants.REPOSITORY_INSPECTOR_JOB_COLLECTION);
            RepositoryInspectorJob repositoryInspectorJob = repositoryInspectorJobs.Find(p_task => p_task.Username.Equals(p_username) && p_task.Frequency == p_frequency).FirstOrDefault();
            return repositoryInspectorJob;
        }


        public IEnumerable<RepositoryInspectorJob> GetAllRepositoryInspectorJobs()
        {
            IList<RepositoryInspectorJob> RepositoryInspectors = new List<RepositoryInspectorJob>();
            IMongoCollection<RepositoryInspectorJob> taskCollection = _database.GetCollection<RepositoryInspectorJob>(DBConnectionConstants.REPOSITORY_INSPECTOR_JOB_COLLECTION);
            RepositoryInspectors = taskCollection.Find(FilterDefinition<RepositoryInspectorJob>.Empty).ToList();

            return RepositoryInspectors;
        }

        public IEnumerable<RepositoryInspectorJob> GetAllRepositoryInspectorJobs(string p_username)
        {
            IList<RepositoryInspectorJob> RepositoryInspectors = new List<RepositoryInspectorJob>();
            IMongoCollection<RepositoryInspectorJob> taskCollection = _database.GetCollection<RepositoryInspectorJob>(DBConnectionConstants.REPOSITORY_INSPECTOR_JOB_COLLECTION);
            FilterDefinition<RepositoryInspectorJob> filterDefinition = Builders<RepositoryInspectorJob>.Filter.Where(p_job => p_job.Username.Equals(p_username));
            List<RepositoryInspectorJob> jobs = taskCollection.Find(filterDefinition).ToList();

            return jobs;
        }

        public bool UpdateRepositoryInspectorJob(RepositoryInspectorJob p_repositoryInspectorJob)
        {
            IMongoCollection<RepositoryInspectorJob> repositoryInspectorJobs = _database.GetCollection<RepositoryInspectorJob>(DBConnectionConstants.REPOSITORY_INSPECTOR_JOB_COLLECTION);
            var updateDef = Builders<RepositoryInspectorJob>.Update.Set(p_task => p_task.Email, p_repositoryInspectorJob.Email)
                                                                   .Set(p_task => p_task.Repositories, p_repositoryInspectorJob.Repositories)
                                                                   .Set(p_task => p_task.SearchKeywords, p_repositoryInspectorJob.SearchKeywords)
                                                                   .Set(p_task => p_task.LastExecutedAt, p_repositoryInspectorJob.LastExecutedAt)
                                                                   .Set(p_task => p_task.Status, p_repositoryInspectorJob.Status)
                                                                   .Set(p_task => p_task.UpdatedAt, p_repositoryInspectorJob.UpdatedAt);

            UpdateResult result = repositoryInspectorJobs.UpdateOne(p_task => p_task.Username == p_repositoryInspectorJob.Username && p_task.Frequency == p_repositoryInspectorJob.Frequency, updateDef);

            if (!result.IsAcknowledged) _logger.LogError("Could not update RepositoryInspector: {RepositoryInspector} Result: {Result}", p_repositoryInspectorJob, result);

            return result.IsAcknowledged;
        }



        public bool DeleteRepositoryInspectorJob(string p_username ,RepositoryInspectorJobFrequency p_frequency)
        {
            IMongoCollection<RepositoryInspectorJob> repositoryInspectorJobs = _database.GetCollection<RepositoryInspectorJob>(DBConnectionConstants.REPOSITORY_INSPECTOR_JOB_COLLECTION);
            DeleteResult result = repositoryInspectorJobs.DeleteOne(p_item => p_item.Username.Equals(p_username) && p_item.Frequency == p_frequency);

            if (!result.IsAcknowledged) _logger.LogError("Could not delete Username: {Username} Result: {Result}", p_username, result);

            return result.IsAcknowledged;
        }

    }
}