using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using RepositoryNotifier.Service;
using RepositoryNotifier.Service.Payment;
using RepositoryNotifier.Service.SMS;

namespace RepositoryNotifier.Controllers
{
    [Route("api/[controller]/[action]/")]
    public class MobileNotificationController : Controller
    {
        private IMobileNotificationService _mobileNotificationService { get; set; }

        public MobileNotificationController(IConfiguration p_configuration,
            IMobileNotificationService p_mobileNotificationService, ILogger<PaymentController> p_logger)
        {
            _mobileNotificationService = p_mobileNotificationService;
        }


        [HttpPost]
        public IActionResult Callback()
        {
            var smsSid = Request.Form["SmsSid"];
            var messageStatus = Request.Form["MessageStatus"];
            var logMessage = $"\"{smsSid}\", \"{messageStatus}\"";

            return Content("Handled");
        }
    }
}