using RepositoryNotifier.Persistence;

namespace RepositoryNotifier.Service
{
    public interface IAbonementService
    {
         void AddAbonement(PayPal.v1.Payments.Payment p_payment, string p_username);
         
         Abonement GetAbonement(string p_username);

         void UpdateAbonement(Abonement p_abonement);

         bool AbonementExists(string p_username);
    }
}