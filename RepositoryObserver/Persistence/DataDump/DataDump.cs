using System.Collections.Generic;

namespace RepositoryNotifier.Persistence.DataDump
{

    public class DataDump
    {
        public Subscription.Subscription Subscription { get; set; }
        public IList<Donation> Donations { get; set; }
        public IList<Job.Job> Jobs { get; set; }
        

        public DataDump(Subscription.Subscription p_subscription, IList<Donation> p_donations, IList<Job.Job> p_jobs)
        {
            Subscription = p_subscription;
            Donations = p_donations;
            Jobs = p_jobs;
        }
    }

}