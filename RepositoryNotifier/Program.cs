using System;
using System.Diagnostics;
using System.IO;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RepositoryNotifier.TaskScheduler;

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
                INotificationTaskScheduler notificationTaskScheduler = services.GetService<INotificationTaskScheduler>();
                //    notificationTaskScheduler.Run();
            }
            catch (Exception ex)
            {
                Debug.Print(ex.StackTrace);
            }

            host.Run();

        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
