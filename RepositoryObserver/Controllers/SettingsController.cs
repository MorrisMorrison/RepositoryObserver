using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using RepositoryNotifier.Service;
using RepositoryNotifier.Service.Job;
using RepositoryNotifier.Persistence.Job;
using RepositoryNotifier.Service.Settings;

namespace RepositoryNotifier.Controllers
{
    [Route("api/[controller]/[action]")]
    public class SettingsController:Controller
    {


        private SettingsService _settingsService {get;set;}
        private ILogger<SettingsController> _logger{get;set;}
        
        public SettingsController(ILogger<SettingsController> p_logger)
        {
            _logger = p_logger;
        }


        [HttpGet]
        public IActionResult GetDataDump(){
            string username = "";




            return Ok(new DataDump());
        }



        
    }


    public class DataDump{

    }
}