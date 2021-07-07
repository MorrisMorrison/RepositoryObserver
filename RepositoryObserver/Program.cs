using System;
using System.Diagnostics;
using System.IO;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using RepositoryNotifier.JobScheduler;
// using Serilog;
// using Serilog.Events;

namespace RepositoryNotifier
{
    public class Program
    {

        public static void Main(string[] args)
        {
            IHost host = CreateHostBuilder(args).Build();

            var services = host.Services;

            try
            {
                // start job scheduler
                IJobScheduler jobScheduler = services.GetService<IJobScheduler>();
                   jobScheduler.Run();

                ILogger<Program> logger = services.GetService<ILogger<Program>>();
                logger.LogInformation("Startup Application.");
            }
            catch (Exception ex)
            {
                Debug.Print(ex.StackTrace);
            }

            host.Run();



        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.ConfigureKestrel(serverOptions =>
                        {
                            // Set properties and call methods on options
                        })
                        .UseStartup<Startup>();
                });
                // .UseStartup<Startup>()
                //    .UseSerilog((hostingContext, loggerConfiguration) => loggerConfiguration
                //     .ReadFrom.Configuration(hostingContext.Configuration)
                //     .Enrich.FromLogContext()
                //     .WriteTo.Console());
    }
}
