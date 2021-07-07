using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using RepositoryNotifier.Config;
using RepositoryNotifier.Constants;

namespace RepositoryNotifier.Persistence
{
    public class DbConnectionProvider:IDbConnectionProvider
    {
        private  string _connectionString { get; set; }
        private  MongoClient _client { get; set; }
        private  IMongoDatabase _database { get; set; }
        private IConfiguration _configuration {get;set;}
        private ILogger<DbConnectionProvider> _logger {get;set;}

        public DbConnectionProvider(IConfiguration p_configuration, ILogger<DbConnectionProvider> p_logger){
            _configuration = p_configuration;
            _logger = p_logger;
        }

        public  IMongoDatabase GetDatabaseConnection()
        {
            if (_database != null) return _database;
            
            _logger.LogInformation("No database connection exists yet. Initializing new connection.");

            DatabaseConfig config = new DatabaseConfig(_configuration);

            _connectionString = config.CONNECTION_STRING;
            _client = new MongoClient(connectionString: _connectionString);
            _database = _client.GetDatabase(config.DATABASE);

            // TODO check if collection exists
            // this always returns true
            bool collectionExists = _database.GetCollection<Persistence.Job.Job>(DBConnectionConstants.JOB_COLLECTION) != null;
            if (!collectionExists)
            {
                _database.CreateCollection(DBConnectionConstants.JOB_COLLECTION);
            }
            
            return _database;
        }
    }
}