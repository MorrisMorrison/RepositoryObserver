using System;
using System.Diagnostics;
using System.IO;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using RepositoryNotifier.RepositoryInspectorJobScheduler;
using Serilog;
using Serilog.Events;

namespace RepositoryNotifier
{
    public class Program
    {

        public static void Main(string[] args)
        {
            IWebHost host = CreateWebHostBuilder(args).Build();

            var services = host.Services;

            try
            {
                // start notification scheduler
                IRepositoryInspectorJobScheduler notificationTaskScheduler = services.GetService<IRepositoryInspectorJobScheduler>();
                //    notificationTaskScheduler.Run();

                ILogger<Program> logger = services.GetService<ILogger<Program>>();
                logger.LogInformation("Startup Application.");
            }
            catch (Exception ex)
            {
                Debug.Print(ex.StackTrace);
            }

            host.Run();



        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                   .UseSerilog((hostingContext, loggerConfiguration) => loggerConfiguration
	.ReadFrom.Configuration(hostingContext.Configuration)
	.Enrich.FromLogContext()
	.WriteTo.Console());
    }
}
