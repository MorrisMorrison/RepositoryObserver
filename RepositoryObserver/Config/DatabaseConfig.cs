using Microsoft.Extensions.Configuration;

namespace RepositoryNotifier.Config
{

    public class DatabaseConfig
    {
        public IConfiguration Configuration { get; }
        public string CONNECTION_STRING { get; }
        public string DATABASE { get; }

        public DatabaseConfig(IConfiguration p_configuration)
        {
            Configuration = p_configuration;
            CONNECTION_STRING = Configuration["Mongo:ConnectionString"];
            DATABASE = Configuration["Mongo:Database"];
        }
    }
}