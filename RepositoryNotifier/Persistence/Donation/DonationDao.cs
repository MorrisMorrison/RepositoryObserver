using System.Collections.Generic;
using MongoDB.Driver;
using RepositoryNotifier.Constants;
using RepositoryNotifier.Helper;

namespace RepositoryNotifier.Persistence
{
    public class DonationDao : IDonationDao
    {


        private IMongoDatabase _database { get; set; }

             public DonationDao(IDbConnectionProvider p_dbConnectionProvider)
        {
            _database = p_dbConnectionProvider.GetDatabaseConnection();
        }


        public void AddDonation(Donation p_donation)
        {
            IMongoCollection<Donation> donations = _database.GetCollection<Donation>(DBConnectionConstants.DONATION_COLLECTION);
            donations.InsertOne(p_donation);
        }

        public IList<Donation> GetAllDonations(string p_username)
        {
            IMongoCollection<Donation> donationsCollection = _database.GetCollection<Donation>(DBConnectionConstants.DONATION_COLLECTION);
            IList<Donation> donations = donationsCollection.Find(p_donation => p_donation.Username == p_username).ToList();
            return donations;
        }
    }
}