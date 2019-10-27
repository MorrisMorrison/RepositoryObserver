using RepositoryNotifier.Persistence.Subscription;

namespace RepositoryNotifier.DTO
{
    public class AbonementTO
    {
        
    }

    public class CreateAbonementTO{
        public double Amount {get;set;}
        public BillingAddress BillingAddress {get;set;}
    }
}