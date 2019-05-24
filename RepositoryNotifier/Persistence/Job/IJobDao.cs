using System.Collections.Generic;
using RepositoryNotifier.DTO;

namespace RepositoryNotifier.Persistence.Job
{
    public interface IJobDao
    {
        // CRUD
        void AddJob(Job p_job);

        Job GetJob(string p_username, JobFrequency p_frequency);

        IEnumerable<Job> GetAllJobs();
        IEnumerable<Job> GetAllJobs(string p_username);
        bool UpdateJob(Job p_job);

        bool DeleteJob(string p_username, JobFrequency p_frequency);




    }
}