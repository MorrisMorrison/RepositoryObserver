using MongoDB.Driver;

namespace RepositoryNotifier.Persistence.Abonement
{
    public interface IAbonementDao
    {
        void AddAbonement(Abonement p_abonement);
        void DeleteAbonement(Abonement p_abonement);
        void DeleteByPremiumPlanType(string p_username, string p_premiumPlanType);
        Abonement GetAbonement(string p_username);
        Abonement GetAbonement(Abonement p_abonement);

        bool UpdateAbonement(Abonement p_abonement);

    }
}