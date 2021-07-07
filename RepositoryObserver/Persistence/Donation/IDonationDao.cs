using System.Collections.Generic;

namespace RepositoryNotifier.Persistence
{
    public interface IDonationDao
    {
          void AddDonation(Donation p_donation);
          IList<Donation> GetAllDonations(string p_username);
    }
}