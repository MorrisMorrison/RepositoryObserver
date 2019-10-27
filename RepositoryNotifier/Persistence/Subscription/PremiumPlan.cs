using System;
using System.Collections.Generic;

namespace RepositoryNotifier.Persistence.Subscription
{
    public class PremiumPlan{

        public string Name {get;set;}
        public double Price{get;set;}
        public DateTime BuyingDate {get;set;}
        public IList<Payment> Payments {get; set;}
    }
}