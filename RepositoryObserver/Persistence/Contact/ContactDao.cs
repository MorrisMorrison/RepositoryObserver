using MongoDB.Driver;
using RepositoryNotifier.Constants;
using RepositoryNotifier.Persistence;



namespace RepositoryNotifier.Persistence
{
    public class ContactDao : IContactDao
    {

        private IMongoDatabase _database { get; set; }

        public ContactDao(IDbConnectionProvider p_dbConnectionProvider)
        {
            _database = p_dbConnectionProvider.GetDatabaseConnection();
        }


        public void AddContact(Contact p_contact)
        {
            IMongoCollection<Contact> contacts = _database.GetCollection<Contact>(DBConnectionConstants.CONTACT_COLLECTION);
            contacts.InsertOne(p_contact);
        }

    }

}