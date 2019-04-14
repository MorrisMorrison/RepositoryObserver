using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoDB.Driver;
using RepositoryNotifier.Constants;
using RepositoryNotifier.Helper;
using RepositoryNotifier.TaskScheduler;

namespace RepositoryNotifier.Persistence
{
    public class NotificationTaskDao: INotificationTaskDao
    {
        private IMongoDatabase _database { get; set; }
        private ILogger<NotificationTaskDao> _logger {get;set;}

        public NotificationTaskDao(IDbConnectionProvider p_dbConnectionProvider, ILogger<NotificationTaskDao> p_logger)
        {
            _database = p_dbConnectionProvider.GetDatabaseConnection();
            _logger = p_logger;
        }


        public void AddNotificationTask(NotificationTask p_notificationTask)
        {
            IMongoCollection<NotificationTask> notificationsTasks = _database.GetCollection<NotificationTask>(DBConnectionConstants.NOTIFICATION_COLLECTION);
            notificationsTasks.InsertOne(p_notificationTask);
        }

        public bool DeleteNotificationTask(NotificationTask p_notificationTask)
        {
            IMongoCollection<NotificationTask> notificationsTasks = _database.GetCollection<NotificationTask>(DBConnectionConstants.NOTIFICATION_COLLECTION);
            DeleteResult result = notificationsTasks.DeleteOne(p_item => p_item.Id.Equals(p_notificationTask.Id) || p_item.Username.Equals(p_notificationTask.Username) || p_item.Email.Equals(p_notificationTask.Username));

            if (!result.IsAcknowledged) _logger.LogError("Could not delete NotificationTask: {NotificationTask} Result: {Result}", p_notificationTask, result);

            return result.IsAcknowledged;
        }

        public NotificationTask GetNotificationTask(string p_username)
        {
            IMongoCollection<NotificationTask> notificationTasks = _database.GetCollection<NotificationTask>(DBConnectionConstants.NOTIFICATION_COLLECTION);
            NotificationTask notificationTask = notificationTasks.Find(p_task => p_task.Username.Equals(p_username)).FirstOrDefault();
            return notificationTask;
        }

        public IEnumerable<NotificationTask> GetNotificationTaskByFrequency(Frequency p_frequency)
        {
            IMongoCollection<NotificationTask> notificationTasks = _database.GetCollection<NotificationTask>(DBConnectionConstants.NOTIFICATION_COLLECTION);
            IList<NotificationTask> tasksByFrequency = notificationTasks.Find(p_task => p_task.Frequency == p_frequency).ToList();
            return tasksByFrequency;
        }

        public IEnumerable<NotificationTask> GetAllNotificationTasks()
        {
            IList<NotificationTask> notificationTasks = new List<NotificationTask>();
            IMongoCollection<NotificationTask> taskCollection = _database.GetCollection<NotificationTask>(DBConnectionConstants.NOTIFICATION_COLLECTION);
            notificationTasks = taskCollection.Find(FilterDefinition<NotificationTask>.Empty).ToList();

            return notificationTasks;
        }

        public IEnumerable<NotificationTask> GetNotificationTaskByUser(string p_username)
        {
            IMongoCollection<NotificationTask> notificationTasks = _database.GetCollection<NotificationTask>(DBConnectionConstants.NOTIFICATION_COLLECTION);
            IList<NotificationTask> tasksByFrequency = notificationTasks.Find(p_task => p_task.Username == p_username).ToList();
            return tasksByFrequency;
        }

        public NotificationTask GetNotificationTaskByUserAndFrequency(string p_username, Frequency p_frequency)
        {
            IMongoCollection<NotificationTask> notificationTasks = _database.GetCollection<NotificationTask>(DBConnectionConstants.NOTIFICATION_COLLECTION);
            NotificationTask taskByUserAndFrequency = notificationTasks.Find(p_task => p_task.Username == p_username && p_task.Frequency == p_frequency).FirstOrDefault();
            return taskByUserAndFrequency;
        }

        public bool DeleteNotificationTask(string p_username, Frequency p_frequency)
        {
            IMongoCollection<NotificationTask> notificationsTasks = _database.GetCollection<NotificationTask>(DBConnectionConstants.NOTIFICATION_COLLECTION);
            DeleteResult result = notificationsTasks.DeleteOne(p_item => p_item.Username == p_username && p_item.Frequency == p_frequency);

            if (!result.IsAcknowledged) _logger.LogError("Could not delete Username: {Username} Frequency: {Frequency} Result: {Result}", p_username, p_frequency, result);

            return result.IsAcknowledged;
        }

        // https://stackoverflow.com/questions/42507640/update-specific-field-in-mongodb-document
        public void UpdateNotificationTaskStatus(NotificationTask p_notificationTask){
            IMongoCollection<NotificationTask> notificationsTasks = _database.GetCollection<NotificationTask>(DBConnectionConstants.NOTIFICATION_COLLECTION);
            var updateDef = Builders<NotificationTask>.Update.Set(p_task => p_task.Status, p_notificationTask.Status);
            UpdateResult result = notificationsTasks.UpdateOne(p_task => p_task.Username == p_notificationTask.Username && p_task.Frequency == p_notificationTask.Frequency, updateDef);
        
            if (!result.IsAcknowledged) _logger.LogError("Could not update NotificationTaskStatus: {NotificationTask} Result: {Result}", p_notificationTask, result);
        }

    public void UpdateNotificationTaskLastExecuted(NotificationTask p_notificationTask){
            IMongoCollection<NotificationTask> notificationsTasks = _database.GetCollection<NotificationTask>(DBConnectionConstants.NOTIFICATION_COLLECTION);
            var updateDef = Builders<NotificationTask>.Update.Set(p_task => p_task.LastExecutedAt, p_notificationTask.LastExecutedAt);
            UpdateResult result = notificationsTasks.UpdateOne(p_task => p_task.Username == p_notificationTask.Username && p_task.Frequency == p_notificationTask.Frequency, updateDef);
        
            if (!result.IsAcknowledged) _logger.LogError("Could not update NotificationTaskLastExecuted: {NotificationTask} Result: {Result}", p_notificationTask, result);
        }


      public  bool UpdateNotificationTask(NotificationTask p_notificationTask){
            IMongoCollection<NotificationTask> notificationsTasks = _database.GetCollection<NotificationTask>(DBConnectionConstants.NOTIFICATION_COLLECTION);
            var updateDef = Builders<NotificationTask>.Update.Set(p_task => p_task.Repositories, p_notificationTask.Repositories)
                                                             .Set(p_task => p_task.SearchKeywords, p_notificationTask.SearchKeywords)
                                                             .Set(p_task => p_task.Email, p_notificationTask.Email);
            UpdateResult result = notificationsTasks.UpdateOne(p_task => p_task.Username == p_notificationTask.Username && p_task.Frequency == p_notificationTask.Frequency, updateDef);
            
            if (!result.IsAcknowledged) _logger.LogError("Could not update NotificationTask: {NotificationTask} Result: {Result}", p_notificationTask, result);

            
            return result.IsAcknowledged;
      }

        
    }
}