using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Octokit;
using Octokit.Internal;
using RepositoryNotifier.Constants;
using RepositoryNotifier.Helper;
using RepositoryNotifier.Persistence.RepositoryInspectorJob;

// https://octokitnet.readthedocs.io/en/latest/search/
namespace RepositoryNotifier.Service.Github
{
    public class GithubApiService: IGithubApiService
    {
        private IHttpContextAccessor _httpContextAccessor { get;}
        private string _accessToken { get; set; }
        
        public GithubApiService(IHttpContextAccessor p_httpContextAccessor)
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


        public async Task<IList<SearchCodeResult>> FindPasswords(RepositoryInspectorJob p_repositoryInspectorJob)
        {
            IList<SearchCodeResult> searchResults = new List<SearchCodeResult>();

            if (string.IsNullOrEmpty(_accessToken)) return searchResults;

            GitHubClient github = new GitHubClient(new ProductHeaderValue("GithubPasswordNotifier"), new InMemoryCredentialStore(new Credentials(_accessToken)));

            string searchKeys ="";
            foreach(string searchKeyword in p_repositoryInspectorJob.SearchKeywords){
                searchKeys += searchKeyword + "+";
            }


            foreach (string p_repository in p_repositoryInspectorJob.Repositories)
            {
                string searchQuery = string.Format("{0}repo:{1}/{2}", searchKeys, p_repositoryInspectorJob.Username, p_repository);
                SearchCodeRequest searchCodeRequest = new SearchCodeRequest(searchQuery);
                SearchCodeResult searchCodeResult = await github.Search.SearchCode(searchCodeRequest);
                searchResults.Add(searchCodeResult);
            }

            return searchResults;
        }
        
        public async Task<bool> FindPassword(RepositoryInspectorJob p_repositoryInspectorJob)
        {
            bool foundPassword = false;
            GitHubClient github = new GitHubClient(new ProductHeaderValue("GithubPasswordNotifier"), new InMemoryCredentialStore(new Credentials(_accessToken)));
            
            foreach (string p_repository in p_repositoryInspectorJob.Repositories)
            {
                SearchCodeRequest searchCodeRequest = new SearchCodeRequest("password", p_repository, p_repositoryInspectorJob.Username);
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