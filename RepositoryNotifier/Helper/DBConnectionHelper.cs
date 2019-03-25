using MongoDB.Driver;
using RepositoryNotifier.Constants;
using RepositoryNotifier.Persistence;

namespace RepositoryNotifier.Helper
{
    public static class DBConnectionHelper
    {
        private static string _connectionString { get; set; }
        private static MongoClient _client { get; set; }
        private static IMongoDatabase _database { get; set; }

        public static IMongoDatabase GetDatabaseConnection()
        {
            if (_database != null) return _database;
            
            _connectionString = DBConnectionConstants.CONNECTION_STRING;
            _client = new MongoClient(connectionString: _connectionString);
            _database = _client.GetDatabase(DBConnectionConstants.DATABASE);

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