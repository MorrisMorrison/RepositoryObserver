using System.Collections.Generic;
using RepositoryNotifier.DTO;

namespace RepositoryNotifier.Persistence.RepositoryInspectorJob
{
    public interface IRepositoryInspectorJobDao
    {
        // CRUD
        void AddRepositoryInspectorJob(RepositoryInspectorJob p_repositoryInspectorJob);

        RepositoryInspectorJob GetRepositoryInspectorJob(string p_username, RepositoryInspectorJobFrequency p_frequency);

        IEnumerable<RepositoryInspectorJob> GetAllRepositoryInspectorJobs();
        IEnumerable<RepositoryInspectorJob> GetAllRepositoryInspectorJobs(string p_username);
        bool UpdateRepositoryInspectorJob(RepositoryInspectorJob p_repositoryInspectorJob);

        bool DeleteRepositoryInspectorJob(string p_username, RepositoryInspectorJobFrequency p_frequency);




    }
}