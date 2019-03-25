using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Octokit;
using Octokit.Internal;
using RepositoryNotifier.Constants;
using RepositoryNotifier.Helper;

// https://octokitnet.readthedocs.io/en/latest/search/
namespace RepositoryNotifier.GithubAPI
{
    public class GithubApiAdapter: IGithubApiAdapter
    {
        private IHttpContextAccessor _httpContextAccessor { get;}
        private string _accessToken { get; set; }
        
        public GithubApiAdapter(IHttpContextAccessor p_httpContextAccessor)
        {
            _httpContextAccessor = p_httpContextAccessor;
        }

        
        
        public async Task<GithubUser> GetGithubUser()
        {
            _accessToken = await AuthHelper.GetAccessToken(_httpContextAccessor.HttpContext);

            GithubUser githubUser = new GithubUser
            {
                GitHubName = AuthHelper.GetUsername(_httpContextAccessor.HttpContext),
                GitHubLogin = AuthHelper.GetLogin(_httpContextAccessor.HttpContext),
                GitHubUrl = AuthHelper.GetUrl(_httpContextAccessor.HttpContext),
                GitHubAvatar = AuthHelper.GetAvatar(_httpContextAccessor.HttpContext),
                GitHubEmail = AuthHelper.GetEmail(_httpContextAccessor.HttpContext)
            };


            GitHubClient github = new GitHubClient(new ProductHeaderValue("GithubPasswordNotifier"), new InMemoryCredentialStore(new Credentials(_accessToken)));
            githubUser.Repositories = await github.Repository.GetAllForCurrent();
            
            return githubUser;
        }


        public async Task<IList<SearchCodeResult>> FindPasswords(Persistence.NotificationTask p_notificationTask)
        {
            IList<SearchCodeResult> searchResults = new List<SearchCodeResult>();
            if (string.IsNullOrEmpty(_accessToken)) return searchResults;

            GitHubClient github = new GitHubClient(new ProductHeaderValue("GithubPasswordNotifier"), new InMemoryCredentialStore(new Credentials(_accessToken)));

            string searchKeys ="";
            foreach(string searchKeyword in p_notificationTask.SearchKeywords){
                searchKeys += searchKeyword + "+";
            }


            foreach (string p_repository in p_notificationTask.Repositories)
            {
                string searchQuery = string.Format("{0}repo:{1}/{2}", searchKeys, p_notificationTask.Username, p_repository);
                SearchCodeRequest searchCodeRequest = new SearchCodeRequest(searchQuery);
                SearchCodeResult searchCodeResult = await github.Search.SearchCode(searchCodeRequest);
                searchResults.Add(searchCodeResult);
            }

            return searchResults;
        }
        
        public async Task<bool> FindPassword(Persistence.NotificationTask p_notificationTask)
        {
            bool foundPassword = false;
            GitHubClient github = new GitHubClient(new ProductHeaderValue("GithubPasswordNotifier"), new InMemoryCredentialStore(new Credentials(_accessToken)));
            
            foreach (string p_repository in p_notificationTask.Repositories)
            {
                SearchCodeRequest searchCodeRequest = new SearchCodeRequest("password", p_repository, p_notificationTask.Username);
                SearchCodeResult searchCodeResult = await github.Search.SearchCode(searchCodeRequest);
                // TODO might not work
                if (searchCodeResult.TotalCount > 0)
                {
                    foundPassword = true;
                }

            }

            return foundPassword;
        }
    }
}