using System.Collections.Generic;
using System.Threading.Tasks;
using RepositoryNotifier.TaskScheduler;

namespace RepositoryNotifier.Service
{
    public class FrequencyService : IFrequencyService
    {
        
        private readonly IList<Frequency> _frequencies = new List<Frequency>
        {
            Frequency.ONE_MINUTE,
            Frequency.FIFTEEN_MINUTES,
            Frequency.THIRTY_MINUTES,
            Frequency.ONE_HOUR,
            Frequency.THREE_HOURS,
            Frequency.SIX_HOURS,
            Frequency.TWELVE_HOURS,
            Frequency.ONE_DAY
        };

        public FrequencyService()
        {
        }

        public IList<Frequency> GetFrequencies()
        {
            return _frequencies;
        }
    }
}