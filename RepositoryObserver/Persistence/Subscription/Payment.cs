using System;
using RepositoryNotifier.Persistence.Subscription;

namespace RepositoryNotifier.Persistence
{

    public class Payment { 
        
        public double Amount {get; set;}
        public DateTime PaymentDate {get; set;}
        public string PaymentType {get;set;}
        public BillingAddress BillingAddress {get;set;}
    }


}