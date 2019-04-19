using RepositoryNotifier.Persistence.Abonement;

namespace RepositoryNotifier.Service
{
    public interface IAbonementService
    {
         void AddAbonement(PayPal.v1.BillingPlans.Plan p_plan, BillingAddress p_billingAddress, string p_username);
         
         Abonement GetAbonement(string p_username);

         void UpdateAbonement(Abonement p_abonement);

         bool AbonementExists(string p_username);

         bool ActivateAbonement(string p_username);
    }
}