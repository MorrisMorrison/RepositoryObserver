using RepositoryNotifier.Persistence.Abonement;

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