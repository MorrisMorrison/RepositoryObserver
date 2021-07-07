using RepositoryNotifier.Persistence.DataDump;

namespace RepositoryNotifier.Service.Settings
{

    public interface ISettingsService
    {

        DataDump GetDataDump(string p_username);

        
    }

}