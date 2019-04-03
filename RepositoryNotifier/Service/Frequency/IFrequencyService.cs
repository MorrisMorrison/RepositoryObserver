using System.Collections.Generic;
using System.Threading.Tasks;
using RepositoryNotifier.TaskScheduler;

namespace RepositoryNotifier.Service
{
    public interface IFrequencyService
    {
        IList<Frequency> GetFrequencies();
    }
}