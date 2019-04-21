using System.Collections.Generic;
using RepositoryNotifier.DTO;
using RepositoryNotifier.Persistence.RepositoryInspectorJob;

namespace RepositoryNotifier.Service.RepositoryInspector
{
    public interface IRepositoryInspectorJobService
    {
        RepositoryInspectorJob CreateRepositoryInspectorJob(CreateRepositoryInspectorJobTO p_repositoryInspectorJob);
        bool DeleteRepositoryInspectorJob(string p_username, RepositoryInspectorJobFrequency p_frequency);
        IEnumerable<RepositoryInspectorJob> GetAllRepositoryInspectorJobs(string p_username);
        IEnumerable<RepositoryInspectorJob> GetAllRepositoryInspectorJobs();
        IEnumerable<RepositoryInspectorJob> GetAllRepositoryInspectorJobs(RepositoryInspectorJobFrequency p_frequency);
        RepositoryInspectorJob GetRepositoryInspectorJob(string p_username, RepositoryInspectorJobFrequency p_frequency);
        bool RepositoryInspectorJobExists(string p_username, RepositoryInspectorJobFrequency p_frequency);
        IEnumerable<string> GetCommonKeywords(int p_amount);
        bool UpdateRepositoryInspectorJob(UpdateRepositoryInspectorJobTO p_repositoryInspectorJob);
        bool UpdateRepositoryInspectorJob(RepositoryInspectorJob p_repositoryInspectorJob);

    }
}