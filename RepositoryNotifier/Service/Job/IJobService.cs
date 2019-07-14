using System.Collections.Generic;
using RepositoryNotifier.DTO;
using RepositoryNotifier.Persistence.Job;

namespace RepositoryNotifier.Service.Job
{
    public interface IJobService
    {
        Persistence.Job.Job CreateJob(RepositoryInspectorJobTO p_repositoryInspectorJob);
        bool DeleteJob(string p_username, JobFrequency p_frequency);
        IEnumerable<Persistence.Job.Job> GetAllJobs(string p_username);
        IEnumerable<Persistence.Job.Job> GetAllJobs();
        IEnumerable<Persistence.Job.Job> GetAllJobs(JobFrequency p_frequency);

        IEnumerable<Persistence.Job.Job> GetAllSchedulerJobs();
        IEnumerable<Persistence.Job.Job> GetAllHookJobs();


        Persistence.Job.Job GetJob(string p_username, JobFrequency p_frequency);
        bool JobExists(string p_username, JobFrequency p_frequency);
        IEnumerable<string> GetCommonKeywords(int p_amount);
        bool UpdateJob(RepositoryInspectorJobTO p_repositoryInspectorJob);
        bool UpdateJob(Persistence.Job.Job p_job);

        IList<JobResult> GetJobResults(string username, JobFrequency p_frequency);

    }
}