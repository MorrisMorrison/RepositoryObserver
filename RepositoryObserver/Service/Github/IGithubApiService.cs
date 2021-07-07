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
        Task<bool> FindKeyword(Persistence.Job.Job p_job);
        Task<IList<SearchCodeResult>> FindKeywordsInRepository(Persistence.Job.Job p_job);
        Task<IList<SearchCodeResult>> FindKeywordsInCommit(Persistence.Job.Job p_job, string p_newstCommitId);
        void CreateWebhook(string p_username, string p_repositoryName);

    }
}