using System.Collections.Generic;
using System.Threading.Tasks;
using RepositoryNotifier.Persistence.Job;

namespace RepositoryNotifier.Service.Job
{
    public class JobFrequencyService : IJobFrequencyService
    {
        
        private readonly IList<JobFrequency> _frequencies = new List<JobFrequency>
        {
            JobFrequency.ONE_MINUTE,
            JobFrequency.FIFTEEN_MINUTES,
            JobFrequency.THIRTY_MINUTES,
            JobFrequency.ONE_HOUR,
            JobFrequency.THREE_HOURS,
            JobFrequency.SIX_HOURS,
            JobFrequency.TWELVE_HOURS,
            JobFrequency.ONE_DAY
        };

        public JobFrequencyService()
        {
        }

        public IList<JobFrequency> GetFrequencies()
        {
            return _frequencies;
        }
    }
}