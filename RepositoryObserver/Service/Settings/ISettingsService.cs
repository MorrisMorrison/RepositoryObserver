using RepositoryNotifier.Persistence.DataDump;

namespace RepositoryNotifier.Service.Settings
{

    public interface ISettingsService
    {

        void CancelSubscription();
        DataDump GetDataDump();

        
    }

}