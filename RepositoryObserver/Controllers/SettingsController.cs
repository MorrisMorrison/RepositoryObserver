using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using RepositoryNotifier.Helper;
using RepositoryNotifier.Persistence.DataDump;
using RepositoryNotifier.Service.Settings;

namespace RepositoryNotifier.Controllers
{
    [Route("api/[controller]/[action]")]
    public class SettingsController : Controller
    {

        private ISettingsService _settingsService { get; set; }
        private ILogger<SettingsController> _logger { get; set; }

        public SettingsController(ISettingsService p_settingsService, ILogger<SettingsController> p_logger)
        {
            _settingsService = p_settingsService;
            _logger = p_logger;
        }


        [HttpGet]
        public async Task<IActionResult> GetDataDump()
        {
            string username = AuthHelper.GetLogin(HttpContext);
            DataDump dataDump = _settingsService.GetDataDump(username);
            string serializeObject = Newtonsoft.Json.JsonConvert.SerializeObject(dataDump);
            return File(Encoding.UTF8.GetBytes(serializeObject), "text/json", "dump.json");
        }


    }

}