using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Octokit;
using RepositoryNotifier.DTO;
using RepositoryNotifier.Helper;
using RepositoryNotifier.Service.Github;

namespace RepositoryNotifier.Controllers
{
    [Route("api/[controller]/[action]")]
    public class AuthController: Controller
    {
        private IGithubApiService _githubApiAdapter { get; set; }
        public AuthController(IGithubApiService p_githubApiAdapter)
        {
            _githubApiAdapter = p_githubApiAdapter;
        }
        
        [HttpGet]
        public IActionResult Login(string returnUrl = "/")
        {
            return Challenge(new AuthenticationProperties() { RedirectUri = returnUrl }, "GitHub");
        }


        public async Task<IActionResult> GetUser()
        {
            GithubUser user  = await _githubApiAdapter.GetGithubUser();
            if (user != null) Ok(user);
            return NotFound();
        }

        public IActionResult IsAuthenticated()
        {
            if (AuthHelper.IsAuthenticated(HttpContext)) return Ok();
            return NotFound();
        }

        public UserTO GetCurrentUser()
        {
            UserTO userTo = new UserTO
            {
                Username = AuthHelper.GetLogin(HttpContext),
                Email = AuthHelper.GetEmail(HttpContext),
                AvatarUrl = AuthHelper.GetAvatar(HttpContext)
            };
            
            return userTo;
        }

        public async Task<IList<string>> GetCurrentUsersRepositories()
        {
            IList<string> repositories = new List<string>();

            GithubUser user  = _githubApiAdapter.GetGithubUser().Result;
            repositories = user.Repositories.ToList().Select(p_repository => p_repository.Name).ToList();

            return repositories;
        }

        public async Task<IActionResult> Logout(){
            await this.HttpContext.SignOutAsync();
            return Ok();
        }
        
    }
}