using RepositoryNotifier.Persistence.Subscription;

namespace RepositoryNotifier.DTO
{

    public class CreateSubscriptionTO{
        public double Amount {get;set;}
        public BillingAddress BillingAddress {get;set;}
    }

}