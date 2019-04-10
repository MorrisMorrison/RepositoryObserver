using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using RepositoryNotifier.Middleware;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Linq;
using RepositoryNotifier.Constants;
using RepositoryNotifier.Persistence;
using RepositoryNotifier.Service;
using RepositoryNotifier.TaskScheduler;
using RepositoryNotifier.Service.Github;

namespace RepositoryNotifier
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // https://docs.microsoft.com/de-de/aspnet/core/security/cors?view=aspnetcore-2.2
            // Add Cors before mvc
            // services.AddCors(options =>
            //     {
            //         options.AddPolicy("AllowDevOrigin",
            //         builder => builder.WithOrigins("https://github.com").AllowAnyHeader().AllowAnyMethod().AllowCredentials());
            //     });
            services.AddCors();
            services.AddMvc();

            // services.AddMvcCore()
            // services.AddApiExplorer();


            // https://www.jerriepelser.com/blog/authenticate-oauth-aspnet-core-2/
            services.AddAuthentication(p_options =>
                {
                    p_options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                    p_options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                    p_options.DefaultChallengeScheme = AuthenticationConstants.AUTHENTICATION_SCHEMA;
                })
                .AddCookie()
                .AddOAuth(AuthenticationConstants.AUTHENTICATION_SCHEMA, p_options =>
                {
                    p_options.ClientId = Configuration["GitHub:ClientId"];
                    p_options.ClientSecret = Configuration["GitHub:ClientSecret"];
                    p_options.CallbackPath = new PathString("/signup-github");

                    //https://cors-anywhere.herokuapp.com/
                    p_options.AuthorizationEndpoint = "https://github.com/login/oauth/authorize";
                    p_options.TokenEndpoint = "https://github.com/login/oauth/access_token";
                    p_options.UserInformationEndpoint = "https://api.github.com/user";
                    // p_options.ClaimsIssuer = "OAuth2-Github";

                   p_options.ClaimActions.MapJsonKey(ClaimTypes.NameIdentifier, "id");
                    p_options.ClaimActions.MapJsonKey(ClaimTypes.Name, "name");
                    // TODO email not working
                    p_options.ClaimActions.MapJsonKey(ClaimTypes.Email, "email");
                    p_options.ClaimActions.MapJsonKey("urn:github:login", "login");
                    p_options.ClaimActions.MapJsonKey("urn:github:url", "html_url");
                    p_options.ClaimActions.MapJsonKey("urn:github:avatar", "avatar_url");

                    p_options.SaveTokens = true;

                    p_options.Events = new OAuthEvents
                    {

                        OnCreatingTicket = async context =>
                        {
                            var request =
                                new HttpRequestMessage(HttpMethod.Get, context.Options.UserInformationEndpoint);
                            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                            request.Headers.Authorization =
                                new AuthenticationHeaderValue("Bearer", context.AccessToken);


                  var response = await context.Backchannel.SendAsync(request, HttpCompletionOption.ResponseHeadersRead, context.HttpContext.RequestAborted);
                            response.EnsureSuccessStatusCode();

                            var user = JObject.Parse(await response.Content.ReadAsStringAsync());

                            context.RunClaimActions(user);
                        }
                    };

 

                });

//    services.AddAuthentication(options =>
//             {
//                 options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
//             })

//             .AddCookie(options =>
//             {
//                 options.LoginPath = "/api/auth/login";
//                 options.LogoutPath = "/api/auth/signout";
//             })

//             .AddGitHub(options =>
//             {
//                 options.ClientId = Configuration["GitHub:ClientId"];
//                 options.ClientSecret = Configuration["GitHub:ClientSecret"];
//                 options.Scope.Add("user:email");
//             });
        



            // Add Singletons
            // Inject dependencies via constructor
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton<IGithubApiService, GithubApiService>();
            services.AddSingleton<INotificationTaskScheduler, NotificationTaskScheduler>();
            services.AddSingleton<INotificationTaskDao, NotificationTaskDao>();
            services.AddSingleton<INotificationTaskCrudService, NotificationTaskCrudService>();
            services.AddSingleton<IFrequencyService, FrequencyService>();
            // services.AddSingleton<IPayPalPaymentProvider, PayPalPaymentProvider>();
            services.AddSingleton<IAbonementService, AbonementService>();
            services.AddSingleton<IAbonementDao, AbonementDao>();
            services.AddSingleton<IDonationService, DonationService>();
            services.AddSingleton<IDonationDao, DonationDao>();
            services.AddSingleton<IPremiumPlanService, PremiumPlanService>();
            services.AddSingleton<IDbConnectionProvider, DbConnectionProvider>();

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration => { configuration.RootPath = "wwwroot"; });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                // app.UseHsts();
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            // built in cors middleware doesnt work => no headers set 
            // app.UseCors(options => options.WithOrigins("http://www.github.com").AllowAnyMethod().AllowCredentials().AllowAnyHeader());
            // app.UseCors();
            app.UseCors(options => options.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

            // own middleware to force CORS headers
            // app.UseCorsMiddleware();

            // app.UseCors(options => options.WithOrigins("https://github.com", "http://www.github.com", "https://www.github.com", "http://www.github.com","https://localhost:5001", "http://localhost:5000", "https://localhost:44375").AllowAnyMethod().AllowAnyHeader().AllowCredentials().SetIsOriginAllowedToAllowWildcardSubdomains());
            app.UseHttpsRedirection();
            app.UseAuthentication();

            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();




            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
                // Uncomment if SPA needs to be served by kestrel
                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Fallback", action = "Index" }
                );
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501
                spa.Options.SourcePath = "ClientApp";
                // if (env.IsDevelopment())
                // {
                //     spa.UseAngularCliServer(npmScript: "start");
                //     // spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
                // }
            });
        }
    }
}