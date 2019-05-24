using System.Collections.Generic;
using System.Threading.Tasks;
using RepositoryNotifier.Persistence;
using Octokit;
using Task = System.Threading.Tasks.Task;
using RepositoryNotifier.Persistence.Job;

namespace RepositoryNotifier.Service.Github
{
    public interface IGithubApiService
    {
        Task<GithubUser> GetGithubUser();
        Task<bool> FindPassword(Persistence.Job.Job p_job);
        Task<IList<SearchCodeResult>> FindPasswords(Persistence.Job.Job p_job);
    }
}