using System.Diagnostics;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using RepositoryNotifier.DTO;
using RepositoryNotifier.Service;

namespace RepositoryNotifier.Controllers
{



    [Route("api/[controller]/[action]/")]
    public class ContactController : Controller
    {


        private IContactService _contactService { get; }
        private ILogger<ContactController> _logger { get; set; }
        public ContactController(IContactService p_contactService, ILogger<ContactController> p_logger)
        {
            _contactService = p_contactService;
            _logger = p_logger;
        }


        [HttpPost]
        public IActionResult CreateContact([FromBody] ContactTO p_contact)
        {
            _contactService.AddContact(p_contact);

                return Ok();

            // _logger.LogError("Could not add RepositoryInspectorJob: {RepositoryInspectorJob} for User: {User}", p_repositoryInspectorJob, AuthHelper.GetLogin(HttpContext));
            // return BadRequest();
        }


    }

}