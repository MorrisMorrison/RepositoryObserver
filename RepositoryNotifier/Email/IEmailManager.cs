using System.Collections.Generic;
using Octokit;

namespace RepositoryNotifier.TaskScheduler
{
    public interface IEmailManager
    {
        void SendNotificationMail(string p_userName, string p_userEmail, IList<SearchCodeResult> p_searchResults);
    }
}