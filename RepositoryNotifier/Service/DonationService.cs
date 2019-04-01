using System;
using System.Linq;
using RepositoryNotifier.Persistence;

namespace RepositoryNotifier.Service
{
    public class DonationService: IDonationService
    {
        private IDonationDao _donationDao {get;set;}

        public DonationService(IDonationDao p_donationDao){
            _donationDao = p_donationDao;
        }

        public void AddDonation( PayPal.v1.Payments.Payment p_payment)
        {
            Donation donation = new Donation(){
                Amount = double.Parse(p_payment.Transactions.FirstOrDefault().Amount.Total),
                CreatedAt = DateTime.Now
            };

            _donationDao.AddDonation(donation);
        }
    }
}