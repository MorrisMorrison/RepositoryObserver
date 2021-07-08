

using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using RepositoryNotifier.JobScheduler;
using RepositoryNotifier.Persistence.Job;
using RepositoryNotifier.Service.Email;
using RepositoryNotifier.Service.Job;
using RepositoryNotifier.Service.SMS;

namespace RepositoryNotifier.Controllers
{
    [Route("api/[controller]/[action]/")]
    public class WebhookController : Controller
    {

        private IJobService _jobService { get; set; }
        private IEmailService _emailService { get; set; }
        private IMobileNotificationService _mobileNotificationService { get; set; }
        private IJobScheduler _jobScheduler { get; set; }


        public WebhookController(IJobService p_jobService, IEmailService p_emailService, IMobileNotificationService p_mobileNotificatioService, IJobScheduler p_jobScheduler)
        {

            _jobService = p_jobService;
            _emailService = p_emailService;
            _mobileNotificationService = p_mobileNotificatioService;
            _jobScheduler = p_jobScheduler;
        }


        [HttpPost]
        public async Task<IActionResult> Handle()
        {
            string ownerName;

            using (var reader = new StreamReader(Request.Body))
            {
                var body = reader.ReadToEnd();
                JObject json = JObject.Parse(body);

                ownerName = json["repository"]["owner"]["name"].ToString();

                Job job = _jobService.GetJob(ownerName, Persistence.Job.JobFrequency.FIFTEEN_MINUTES);

                await _jobScheduler.ExecuteJob(job);

                return Ok();
            }
        }


    }
}
