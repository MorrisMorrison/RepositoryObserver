using System.Collections.Generic;
using RepositoryNotifier.DTO;
using RepositoryNotifier.Persistence;
using RepositoryNotifier.TaskScheduler;

namespace RepositoryNotifier.Service
{
    public interface INotificationTaskCrudService
    {
        void AddNotificationTask(AddNotificationTO p_notification);
        void DeleteNotificationTask(NotificationTask p_notificationTask);
        void DeleteNotificationTask(string p_username, Frequency p_frequency);
        NotificationTask GetNotificationTask(string p_username);
        IEnumerable<NotificationTask> GetNotificationTaskByFrequency(Frequency p_frequency);
        IEnumerable<NotificationTask> GetAllNotificationTasks();
        IEnumerable<NotificationTask> GetNotificationTasksByUser(string p_username);
        NotificationTask GetNotificationTask(string p_username, Frequency p_frequency);
        bool NotificationTaskExists(string p_username, Frequency p_frequency);
        IEnumerable<string> GetCommonKeywords(int p_amount);
        void UpdateStatus(NotificationTask p_notificationTask);
        void UpdateLastExecuted(NotificationTask p_notificationTask);
        void UpdateNotificationTask(UpdateNotificationTO p_notification);
    }
}