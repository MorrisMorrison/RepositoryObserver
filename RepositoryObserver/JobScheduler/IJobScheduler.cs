using System.Threading.Tasks;
using RepositoryNotifier.Persistence;
using RepositoryNotifier.Persistence.Job;

namespace RepositoryNotifier.JobScheduler
{
    public interface IJobScheduler
    {
        Task Run();
        Task ExecuteJob(Job p_job);
        Task ExecuteJobs(JobFrequency p_frequency);
    }
}