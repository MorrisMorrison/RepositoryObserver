using System.Collections.Generic;
using System.Threading.Tasks;
using RepositoryNotifier.Persistence;
using Octokit;
using Task = System.Threading.Tasks.Task;

namespace RepositoryNotifier.GithubAPI
{
    public interface IGithubApiAdapter
    {
        Task<GithubUser> GetGithubUser();
        Task<bool> FindPassword(NotificationTask p_notificationTask);
        Task<IList<SearchCodeResult>> FindPasswords(NotificationTask p_notificationTask);
    }
}