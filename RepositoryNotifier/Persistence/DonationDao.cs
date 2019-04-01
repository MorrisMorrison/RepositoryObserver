using MongoDB.Driver;
using RepositoryNotifier.Constants;
using RepositoryNotifier.Helper;

namespace RepositoryNotifier.Persistence
{
    public class DonationDao : IDonationDao
    {


        private IMongoDatabase _database { get; set; }

        public DonationDao()
        {
            _database = DBConnectionHelper.GetDatabaseConnection();
        }


        public void AddDonation(Donation p_donation)
        {
            IMongoCollection<Donation> donations = _database.GetCollection<Donation>(DBConnectionConstants.ABONEMENT_COLLECTION);
            donations.InsertOne(p_donation);
        }

    }
}