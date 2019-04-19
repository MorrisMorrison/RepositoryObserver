using System;
using System.Collections.Generic;
using System.Linq;
using RepositoryNotifier.Persistence.Abonement;

namespace RepositoryNotifier.Service
{


 public class PremiumPlanService:IPremiumPlanService {
        public PremiumPlanService()
        {
        }

        public IDictionary<string, double> GetPremiumPlanTypes(){
            return new Dictionary<string, double>(){ 
                {"PRO", 10.0},
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


        public string GetPremiumPlanType(double p_amount){
            IDictionary<string, double> premiumPlanTypes = GetPremiumPlanTypes();
            string premiumPlanType = premiumPlanTypes.FirstOrDefault(p_premiumPlan => p_premiumPlan.Value == p_amount).Key;

            return premiumPlanType;
        }

        public double GetPremiumPlanPrice(string p_premiumPlanType)
        {
             IList<PremiumPlan> premiumPlans = GetPremiumPlans();
             return premiumPlans.FirstOrDefault(p_premiumPlan => p_premiumPlan.Name.Equals(p_premiumPlanType)).Price;
        }
    }



}