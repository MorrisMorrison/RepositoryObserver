using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using RepositoryNotifier.Constants;

namespace RepositoryNotifier.Helper
{
    public class AuthHelper
    {
        public static string GetUsername(HttpContext p_httpContext)
        {
            return p_httpContext.User.FindFirst(c => c.Type == ClaimTypes.Name)?.Value;
        }
        
        public static string GetEmail(HttpContext p_httpContext)
        {
            return p_httpContext.User.FindFirst(c => c.Type == ClaimTypes.Email)?.Value;
        }
        
        public static string GetLogin(HttpContext p_httpContext)
        {
            return p_httpContext.User.FindFirst(c => c.Type == "urn:github:login")?.Value;
        }
        public static string GetUrl(HttpContext p_httpContext)
        {
            return p_httpContext.User.FindFirst(c => c.Type == "urn:github:url")?.Value;
        }
        public static string GetAvatar(HttpContext p_httpContext)
        {
            return p_httpContext.User.FindFirst(c => c.Type == "urn:github:avatar")?.Value;
        }
        public static async Task<string> GetAccessToken(HttpContext p_httpContext)
        {
            return await p_httpContext.GetTokenAsync(AuthenticationConstants.AUTHENTICATION_SCHEMA,"access_token");
        }

        public static bool IsAuthenticated(HttpContext p_httpContext)
        {
            return p_httpContext.User.Identity.IsAuthenticated;
        }
    }
}