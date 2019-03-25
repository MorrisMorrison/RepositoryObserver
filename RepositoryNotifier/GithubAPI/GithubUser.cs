using System.Collections.Generic;
using System.Security.Claims;
using RepositoryNotifier.Persistence;

namespace RepositoryNotifier.GithubAPI
{
    //https://www.jerriepelser.com/blog/authenticate-oauth-aspnet-core-2/
    public class GithubUser
    {
        public string GitHubAvatar { get; set; }

        public string GitHubLogin { get; set; }

        public string GitHubName { get; set; }

        public string GitHubUrl { get; set; }
        
        public string GitHubEmail { get; set; }

        public IReadOnlyList<Octokit.Repository> Repositories { get; set; }
        
    }
}