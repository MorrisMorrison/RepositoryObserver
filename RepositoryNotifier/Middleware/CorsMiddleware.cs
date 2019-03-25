using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

namespace RepositoryNotifier.Middleware
{
    
    // https://stackoverflow.com/questions/44379560/how-to-enable-cors-in-asp-net-core-webapi
    public class CorsMiddleware
    {
        private readonly RequestDelegate _next;

        public CorsMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            httpContext.Response.Headers.Add("Access-Control-Allow-Origin", "http://github.com");
            // httpContext.Response.Headers.Add("Access-Control-Allow-Credentials", "true");
            httpContext.Response.Headers.Add("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token");
            httpContext.Response.Headers.Add("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD, OPTIONS");
            httpContext.Response.Headers.Add("Access-Control-Allow-Credentials", "true");

            // httpContext.Response.Headers.Add("Referrer-Policy", "no-referrer-when-downgrade");

            
            if (httpContext.Request.Method == "OPTIONS")
            {
                httpContext.Response.StatusCode = (int)HttpStatusCode.OK;
                await httpContext.Response.WriteAsync(string.Empty);
            }
            
            await _next(httpContext);
        }
    }
    
    public static class CorsMiddlewareExtensions
    {
        public static IApplicationBuilder UseCorsMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<CorsMiddleware>();
        }
    }
}