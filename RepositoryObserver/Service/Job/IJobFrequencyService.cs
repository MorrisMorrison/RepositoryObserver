using System.Collections.Generic;
using System.Threading.Tasks;
using RepositoryNotifier.Persistence.Job;

namespace RepositoryNotifier.Service.Job
{
    public interface IJobFrequencyService
    {
        IList<JobFrequency> GetFrequencies();
    }
}