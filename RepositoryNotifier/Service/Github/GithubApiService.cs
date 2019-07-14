using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Octokit;
using Octokit.Internal;
using RepositoryNotifier.Constants;
using RepositoryNotifier.Helper;
using RepositoryNotifier.Persistence.Job;

// https://octokitnet.readthedocs.io/en/latest/search/
namespace RepositoryNotifier.Service.Github
{
    public class GithubApiService: IGithubApiService
    {
        private IHttpContextAccessor _httpContextAccessor { get;}
        private string _accessToken { get; set; }

        private GitHubClient _gitHubclient;
        protected GitHubClient GitHubClient
        {
            get
            {
                // if (_gitHubclient == null)
                // {
                    _gitHubclient  = new GitHubClient(new ProductHeaderValue("MorrisMorrison"), new InMemoryCredentialStore(new Credentials(_accessToken)));
                // }

                return _gitHubclient;
            }

            set { _gitHubclient = value; }
        }

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

            githubUser.Repositories = await GitHubClient.Repository.GetAllForCurrent();
            return githubUser;
        }


        public async Task<IList<SearchCodeResult>> FindKeywordsInRepository(Persistence.Job.Job p_job)
        {
            IList<SearchCodeResult> searchResults = new List<SearchCodeResult>();

            if (string.IsNullOrEmpty(_accessToken)) return searchResults;


            string searchKeys ="";
            foreach(string searchKeyword in p_job.SearchKeywords){
                searchKeys += searchKeyword + "+";
            }


            foreach (string p_repository in p_job.Repositories)
            {
                string searchQuery = string.Format("{0}repo:{1}/{2}", searchKeys, p_job.Username, p_repository);
                SearchCodeRequest searchCodeRequest = new SearchCodeRequest(searchQuery);
                SearchCodeResult searchCodeResult = await GitHubClient.Search.SearchCode(searchCodeRequest);
                searchResults.Add(searchCodeResult);
            }

            return searchResults;
        }

        public async Task<IList<SearchCodeResult>> FindKeywordsInCommit(Persistence.Job.Job p_job, string p_newestCommitId)
        {
            IList<SearchCodeResult> searchResults = new List<SearchCodeResult>();

            if (string.IsNullOrEmpty(_accessToken)) return searchResults;


            string searchKeys ="";
            foreach(string searchKeyword in p_job.SearchKeywords){
                searchKeys += searchKeyword + "+";
            }


            foreach (string p_repository in p_job.Repositories)
            {
                string searchQuery = string.Format("{0}repo:{1}/{2}", searchKeys, p_job.Username, p_repository);
                SearchCodeRequest searchCodeRequest = new SearchCodeRequest(searchQuery);
                SearchCodeResult searchCodeResult = await GitHubClient.Search.SearchCode(searchCodeRequest);
                searchResults.Add(searchCodeResult);
            }

            return searchResults;
        }

        // https://developer.github.com/v3/search/#search-commits
        // https://octokit.github.io/octokit.rb/Octokit/Client/Search.html
        // public Task<long> GetLatestCommitId(Persistence.Job.Job p_job)
        // {
        //     // new SearchClient().Sear
        //     IList<SearchCodeResult> searchResults = new List<SearchClient>();

        //     if (string.IsNullOrEmpty(_accessToken)) return searchResults;


        //     string searchKeys ="";
        //     foreach(string searchKeyword in p_job.SearchKeywords){
        //         searchKeys += searchKeyword + "+";
        //     }


        //     foreach (string p_repository in p_job.Repositories)
        //     {
        //         string searchQuery = string.Format("{0}repo:{1}/{2}", searchKeys, p_job.Username, p_repository);
        //         SearchCodeRequest searchCodeRequest = new SearchCodeRequest(searchQuery);
        //         SearchCodeResult searchCodeResult = await GitHubClient.Search.SearchCode(searchCodeRequest);
        //         searchResults.Add(searchCodeResult);
        //     }

        //     return searchResults;
            

        // }

        public async void CreateWebhook(string p_username, string p_repositoryName){

            if (string.IsNullOrEmpty(_accessToken)) return;

            IReadOnlyDictionary<string, string> config = new Dictionary<string, string>(){
                {"url", "http://repositoryobserver.herokuapp.com/webhook/handle"},
                {"content_type", "json"},
                {"secret", _accessToken},
            };

            NewRepositoryHook webhook = new NewRepositoryHook("web", config);
            webhook.Events = new List<string>(){"push"};
            webhook.Active = false;

            RepositoryHook task = await GitHubClient.Repository.Hooks.Create(p_username, p_repositoryName, webhook);
        }

        public async Task<bool> FindKeyword(Persistence.Job.Job p_job)
        {
            bool foundPassword = false;
            
            foreach (string p_repository in p_job.Repositories)
            {
                SearchCodeRequest searchCodeRequest = new SearchCodeRequest("password", p_repository, p_job.Username);
                SearchCodeResult searchCodeResult = await GitHubClient.Search.SearchCode(searchCodeRequest);
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