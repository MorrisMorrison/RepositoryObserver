using System.Collections.Generic;
using System.Threading.Tasks;
using RepositoryNotifier.Persistence.RepositoryInspectorJob;

namespace RepositoryNotifier.Service.RepositoryInspector
{
    public class RepositoryInspectorJobFrequencyService : IRepositoryInspectorJobFrequencyService
    {
        
        private readonly IList<RepositoryInspectorJobFrequency> _frequencies = new List<RepositoryInspectorJobFrequency>
        {
            RepositoryInspectorJobFrequency.ONE_MINUTE,
            RepositoryInspectorJobFrequency.FIFTEEN_MINUTES,
            RepositoryInspectorJobFrequency.THIRTY_MINUTES,
            RepositoryInspectorJobFrequency.ONE_HOUR,
            RepositoryInspectorJobFrequency.THREE_HOURS,
            RepositoryInspectorJobFrequency.SIX_HOURS,
            RepositoryInspectorJobFrequency.TWELVE_HOURS,
            RepositoryInspectorJobFrequency.ONE_DAY
        };

        public RepositoryInspectorJobFrequencyService()
        {
        }

        public IList<RepositoryInspectorJobFrequency> GetFrequencies()
        {
            return _frequencies;
        }
    }
}