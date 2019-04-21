using System.Collections.Generic;
using System.Threading.Tasks;
using RepositoryNotifier.Persistence;
using Octokit;
using Task = System.Threading.Tasks.Task;
using RepositoryNotifier.Persistence.RepositoryInspectorJob;

namespace RepositoryNotifier.Service.Github
{
    public interface IGithubApiService
    {
        Task<GithubUser> GetGithubUser();
        Task<bool> FindPassword(RepositoryInspectorJob p_repositoryInspectorJob);
        Task<IList<SearchCodeResult>> FindPasswords(RepositoryInspectorJob p_repositoryInspectorJob);
    }
}