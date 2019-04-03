using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http.Connections;
using RepositoryNotifier.DTO;
using RepositoryNotifier.Persistence;
using RepositoryNotifier.TaskScheduler;

namespace RepositoryNotifier.Service
{
    public class NotificationTaskCrudService : INotificationTaskCrudService
    {
        private INotificationTaskDao _notificationTaskDao { get; }

        public NotificationTaskCrudService(INotificationTaskDao p_notificationTaskDao)
        {
            _notificationTaskDao = p_notificationTaskDao;
        }

        public void AddNotificationTask(AddNotificationTO p_notification)
        {
            NotificationTask notificationTask = new NotificationTask
            {
                Username = p_notification.Username,
                Email = p_notification.Email,
                Frequency = p_notification.Frequency,
                Repositories = p_notification.Repositories,
                SearchKeywords = p_notification.SearchKeywords,
            };

            _notificationTaskDao.AddNotificationTask(notificationTask);
        }

        public void DeleteNotificationTask(NotificationTask p_notificationTask)
        {
            _notificationTaskDao.DeleteNotificationTask(p_notificationTask);
        }

        public NotificationTask GetNotificationTask(string p_username)
        {
            return _notificationTaskDao.GetNotificationTask(p_username);
        }

        public IEnumerable<NotificationTask> GetNotificationTaskByFrequency(Frequency p_frequency)
        {
            return _notificationTaskDao.GetNotificationTaskByFrequency(p_frequency);
        }

        public IEnumerable<NotificationTask> GetAllNotificationTasks()
        {

            return _notificationTaskDao.GetAllNotificationTasks();
        }

        public bool NotificationTaskExists(string p_username, Frequency p_frequency)
        {
            return GetNotificationTask(p_username, p_frequency) != null;
        }

        public IEnumerable<NotificationTask> GetNotificationTasksByUser(string p_username)
        {
            return _notificationTaskDao.GetNotificationTaskByUser(p_username);
        }

        public NotificationTask GetNotificationTask(string p_username, Frequency p_frequency)
        {
            return _notificationTaskDao.GetNotificationTaskByUserAndFrequency(p_username, p_frequency);
        }

        public void DeleteNotificationTask(string p_username, Frequency p_frequency)
        {
            _notificationTaskDao.DeleteNotificationTask(p_username, p_frequency);
        }

        // TODO way too expensive
        public IEnumerable<string> GetCommonKeywords(int p_amount)
        {
            IEnumerable<NotificationTask> allNotificationTasks = _notificationTaskDao.GetAllNotificationTasks();
            IList<IList<string>> allKeywords = allNotificationTasks.Select(notificationTask => notificationTask.SearchKeywords).ToList();

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

        // TODO Status should be enum
        public void UpdateStatus(NotificationTask p_notificationTask){
            _notificationTaskDao.UpdateNotificationTaskStatus(p_notificationTask);
        }

        public void UpdateLastExecuted(NotificationTask p_notificationTask){
            p_notificationTask.LastExecutedAt = DateTime.Now;
            _notificationTaskDao.UpdateNotificationTaskLastExecuted(p_notificationTask);
        }

        public void UpdateNotificationTask(UpdateNotificationTO p_notification){
            NotificationTask notificationTask = new NotificationTask
            {
                Username = p_notification.Username,
                Email = p_notification.Email,
                Frequency = p_notification.Frequency,
                Repositories = p_notification.Repositories,
                SearchKeywords = p_notification.SearchKeywords,
            };
            _notificationTaskDao.UpdateNotificationTask(notificationTask);
        }

    }
}