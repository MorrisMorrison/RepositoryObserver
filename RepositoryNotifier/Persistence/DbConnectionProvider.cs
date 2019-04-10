using Microsoft.Extensions.Configuration;
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

        public DbConnectionProvider(IConfiguration p_configuration){
            _configuration = p_configuration;
        }

        public  IMongoDatabase GetDatabaseConnection()
        {
            if (_database != null) return _database;
            
            DatabaseConfig config = new DatabaseConfig(_configuration);

            _connectionString = config.CONNECTION_STRING;
            _client = new MongoClient(connectionString: _connectionString);
            _database = _client.GetDatabase(config.DATABASE);

            // TODO check if collection exists
            // this always returns true
            bool collectionExists = _database.GetCollection<NotificationTask>(DBConnectionConstants.NOTIFICATION_COLLECTION) != null;
            if (!collectionExists)
            {
                _database.CreateCollection(DBConnectionConstants.NOTIFICATION_COLLECTION);
            }
            
            return _database;
        }
    }
}