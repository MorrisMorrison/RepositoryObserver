using System.Collections.Generic;
using RepositoryNotifier.Persistence.Abonement;

namespace RepositoryNotifier.Service
{
    public interface IPremiumPlanService
    {
          string GetPremiumPlanType(double p_amount);
          double GetPremiumPlanPrice(string p_premiumPlanType);

          IList<PremiumPlan> GetPremiumPlans();
          IDictionary<string, double> GetPremiumPlanTypes();
    }
}