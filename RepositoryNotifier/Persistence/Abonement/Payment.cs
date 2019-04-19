using System;
using RepositoryNotifier.Persistence.Abonement;

namespace RepositoryNotifier.Persistence
{

    public class Payment { 
        
        public double Amount {get; set;}
        public DateTime PaymentDate {get; set;}
        public string PaymentType {get;set;}

    }


}