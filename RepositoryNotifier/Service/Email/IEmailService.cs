using System.Collections.Generic;
using Octokit;

namespace RepositoryNotifier.Service.Email
{
    public interface IEmailService
    {
        void SendNotificationMail(string p_userName, string p_userEmail, IList<SearchCodeResult> p_searchResults);
    }
}