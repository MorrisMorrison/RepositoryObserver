using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using RepositoryNotifier.Service;
using RepositoryNotifier.Service.Job;
using RepositoryNotifier.Persistence.Job;

namespace RepositoryNotifier.Controllers
{
    [Route("api/[controller]/[action]")]
    public class FrequencyController:Controller
    {

        private IJobFrequencyService _frequencyService {get;set;}
        private ILogger<FrequencyController> _logger{get;set;}
        
        public FrequencyController(IJobFrequencyService p_frequencyService, ILogger<FrequencyController> p_logger)
        {
            _frequencyService = p_frequencyService;
            _logger = p_logger;
        }

        public IList<JobFrequency> GetFrequencies()
        {
            IList<JobFrequency> frequencies = _frequencyService.GetFrequencies();
            
            if (frequencies == null || frequencies.Count < 1){
                _logger.LogError("Could not get Frequencies {Frequencies}", frequencies);
            }

            return frequencies;
        }
        
    }
}