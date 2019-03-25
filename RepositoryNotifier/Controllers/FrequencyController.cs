using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using RepositoryNotifier.Service;
using RepositoryNotifier.TaskScheduler;

namespace RepositoryNotifier.Controllers
{
    [Route("api/[controller]/[action]")]
    public class FrequencyController:Controller
    {

        private IFrequencyService _frequencyService;
        
        public FrequencyController(IFrequencyService p_frequencyService)
        {
            _frequencyService = p_frequencyService;
        }

        public IList<Frequency> GetFrequencies()
        {
            IList<Frequency> frequencies = _frequencyService.GetFrequencies();
            return frequencies;
        }
        
    }
}