using System.Collections.Generic;
using System.Threading.Tasks;
using RepositoryNotifier.Persistence.RepositoryInspectorJob;

namespace RepositoryNotifier.Service.RepositoryInspector
{
    public interface IRepositoryInspectorJobFrequencyService
    {
        IList<RepositoryInspectorJobFrequency> GetFrequencies();
    }
}