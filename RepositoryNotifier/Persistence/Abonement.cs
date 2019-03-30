using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace RepositoryNotifier.Persistence
{
    public class Abonement
    {

        [BsonId]
        public ObjectId Id { get; set; }

        [BsonElement("username")]
        public string Username { get; set; }

        [BsonElement("premium_plans")]
        public PremiumPlan PremiumPlans {get;set;}

    }


    public class PremiumPlanService {
        public IDictionary<string, double> GetPremiumPlanTypes(){
            return new Dictionary<string, double>(){ 
                {"PRO", 1.0},
                {"PREMIUM", 2.0}
            };
        }

        public IList<PremiumPlan> GetPremiumPlans(){
            IList<PremiumPlan> premiumPlans = new List<PremiumPlan>();

            IDictionary<string, double> premiumPlanTypes = GetPremiumPlanTypes();
            foreach (KeyValuePair<string, double> p_premium_plan in premiumPlanTypes)
            {
                premiumPlans.Add(new PremiumPlan(){
                    Name = p_premium_plan.Key,
                    Price = p_premium_plan.Value,

                });
            }

            return premiumPlans;
        }
    }

    public class PremiumPlan{

        public string Name {get;set;}
        public double Price{get;set;}
        public DateTime BuyingDate {get;set;}
        public IList<Payment> Payments {get; set;}
    }

    public class Payment { 

        public double Amount {get; set;}
        public DateTime PaymentDate {get; set;}

    }

}