using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using RepositoryNotifier.DTO;
using RepositoryNotifier.Helper;
using RepositoryNotifier.Persistence;
using RepositoryNotifier.Service;
using RepositoryNotifier.TaskScheduler;

namespace RepositoryNotifier.Controllers
{

    [Route("api/[controller]/[action]/")]
    public class NotificationTaskController : Controller
    {

        private INotificationTaskCrudService _notificationTaskCrudService { get; }

        public NotificationTaskController(INotificationTaskCrudService p_notificationTaskCrudService)
        {
            _notificationTaskCrudService = p_notificationTaskCrudService;
        }

        [HttpGet]
        public IActionResult AlreadyCreated()
        {
            bool alreadyCreated =
                _notificationTaskCrudService.GetNotificationTask(HttpContext.User.FindFirst(c => c.Type == ClaimTypes.Name)
                    ?.Value) != null;

            if (alreadyCreated) return Ok();
            return NotFound();
        }

        [HttpPost]
        public IActionResult AddNotification([FromBody] AddNotificationTO p_notification)
        {
            if (_notificationTaskCrudService.NotificationTaskExists(p_notification.Username, p_notification.Frequency))
                return Conflict();

            NotificationTask task = _notificationTaskCrudService.AddNotificationTask(p_notification);

            if (task != null && task.Id != null)
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpDelete]
        public IActionResult DeleteNotification([FromQuery(Name = "frequency")]Frequency p_frequency)
        {
            string username = AuthHelper.GetLogin(HttpContext);
            bool success = _notificationTaskCrudService.DeleteNotificationTask(username, p_frequency);

            if (success)
            {
                return Ok();
            }
            return BadRequest();
        }

        [HttpGet]
        public IActionResult GetAllNotifications()
        {
            string username = AuthHelper.GetLogin(HttpContext);
            IList<NotificationTask> notificationTasksByUser = _notificationTaskCrudService.GetNotificationTasksByUser(username).ToList();
            if (notificationTasksByUser != null && notificationTasksByUser.Count > 0)
            {
                return Ok(notificationTasksByUser);
            }

            return BadRequest();
        }

        [HttpGet]
        public IActionResult GetCommonKeywords()
        {
            IList<string> commonKeywords = _notificationTaskCrudService.GetCommonKeywords(5).ToList();

            if (commonKeywords != null && commonKeywords.Count > 1)
            {
                return Ok(commonKeywords);
            }

            return BadRequest();
        }

        [HttpPut]
        public IActionResult UpdateNotification([FromBody]UpdateNotificationTO p_notification){
            bool success = _notificationTaskCrudService.UpdateNotificationTask(p_notification);

            if(success){
                return Ok();
            }
            return BadRequest();
        }
    }
}