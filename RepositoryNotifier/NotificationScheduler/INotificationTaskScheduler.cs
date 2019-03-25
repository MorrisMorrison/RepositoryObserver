using System.Threading.Tasks;
using RepositoryNotifier.Persistence;

namespace RepositoryNotifier.TaskScheduler
{
    public interface INotificationTaskScheduler
    {
        Task Run();
        Task ExecuteNotificationTask(NotificationTask p_notificationTask);
        Task ExecuteNotificationTasksByFrequency(Frequency p_frequency);
    }
}