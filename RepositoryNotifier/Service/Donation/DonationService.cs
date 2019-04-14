using System;
using System.Collections.Generic;
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

        public void AddDonation( PayPal.v1.Payments.Payment p_payment,string p_username)
        {
            Donation donation = new Donation(){
                Username = p_username,
                Amount = double.Parse(p_payment.Transactions.FirstOrDefault().Amount.Total),
                CreatedAt = DateTime.Now
            };

            _donationDao.AddDonation(donation);
        }

        public IList<Donation> GetAllDonations(string p_username)
        {
            return _donationDao.GetAllDonations(p_username);
        }
    }
}