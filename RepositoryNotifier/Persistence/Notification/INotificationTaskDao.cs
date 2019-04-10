using System.Collections.Generic;
using RepositoryNotifier.DTO;
using RepositoryNotifier.TaskScheduler;

namespace RepositoryNotifier.Persistence
{
    public interface INotificationTaskDao
    {
        void AddNotificationTask(NotificationTask p_notificationTask);
        bool DeleteNotificationTask(NotificationTask p_notificationTask);
        bool DeleteNotificationTask(string p_username, Frequency p_frequency);
        NotificationTask GetNotificationTask(string p_username);
        IEnumerable<NotificationTask> GetNotificationTaskByFrequency(Frequency p_frequency);
        IEnumerable<NotificationTask> GetNotificationTaskByUser(string p_username);
        NotificationTask GetNotificationTaskByUserAndFrequency(string p_username, Frequency p_frequency);
        IEnumerable<NotificationTask> GetAllNotificationTasks();
        void UpdateNotificationTaskStatus(NotificationTask p_notificationTask);
        void UpdateNotificationTaskLastExecuted(NotificationTask p_notificationTask);
        bool UpdateNotificationTask(NotificationTask p_notificationTask);
    }
}