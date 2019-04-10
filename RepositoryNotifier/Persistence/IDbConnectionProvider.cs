using MongoDB.Driver;

namespace RepositoryNotifier.Persistence
{
    public interface IDbConnectionProvider
    {
             IMongoDatabase GetDatabaseConnection();
    }
}