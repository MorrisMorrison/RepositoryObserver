using System.Linq;
using RepositoryNotifier.Persistence;
using RepositoryNotifier.Persistence.DataDump;
using RepositoryNotifier.Persistence.Job;
using RepositoryNotifier.Persistence.Subscription;

namespace RepositoryNotifier.Service.Settings
{

    public class SettingsService : ISettingsService
    {
        private ISubscriptionDao SubscriptionDao { get; set; }
        private IJobDao JobDao { get; set; }
        private IDonationDao DonationDao { get; set; }

        public SettingsService(ISubscriptionDao p_subscriptionDao, IJobDao p_jobDao, IDonationDao p_donationDao)
        {
            SubscriptionDao = p_subscriptionDao;
            JobDao = p_jobDao;
            DonationDao = p_donationDao;
        }

        public DataDump GetDataDump(string p_username)
        {
            return new DataDump(
                SubscriptionDao.GetSubscription(p_username),
                DonationDao.GetAllDonations(p_username),
                JobDao.GetAllJobs(p_username).ToList()
                );
        }
    }
}