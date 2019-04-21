using System.Threading.Tasks;
using RepositoryNotifier.Persistence;
using RepositoryNotifier.Persistence.RepositoryInspectorJob;

namespace RepositoryNotifier.RepositoryInspectorJobScheduler
{
    public interface IRepositoryInspectorJobScheduler
    {
        Task Run();
        Task ExecuteRepositoryInspectorJob(RepositoryInspectorJob p_repositoryInspectorJob);
        Task ExecuteRepositoryInspectorJobs(RepositoryInspectorJobFrequency p_frequency);
    }
}