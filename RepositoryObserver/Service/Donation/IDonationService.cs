using System.Collections.Generic;
using RepositoryNotifier.Persistence;

namespace RepositoryNotifier.Service
{
    public interface IDonationService
    {
         void AddDonation( PayPal.v1.Payments.Payment p_payment, string p_username);
         IList<Donation> GetAllDonations(string p_username);
    }
}