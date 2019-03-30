using MongoDB.Driver;
using RepositoryNotifier.Constants;
using RepositoryNotifier.Helper;

namespace RepositoryNotifier.Persistence
{
    public class AbonementDao : IAbonementDao
    {

        private IMongoDatabase _database { get; set; }

        public AbonementDao()
        {
            _database = DBConnectionHelper.GetDatabaseConnection();
        }


        public void AddAbonement(Abonement p_abonement)
        {
            IMongoCollection<Abonement> abonements = _database.GetCollection<Abonement>(DBConnectionConstants.ABONEMENT_COLLECTION);
            abonements.InsertOne(p_abonement);
        }
        public void DeleteAbonement(Abonement p_abonement)
        {
            IMongoCollection<Abonement> abonements = _database.GetCollection<Abonement>(DBConnectionConstants.ABONEMENT_COLLECTION);
            abonements.DeleteOne(p_item => p_item.Id.Equals(p_abonement.Id) || p_item.Username.Equals(p_abonement.Username));
        }
        public void DeleteByPremiumPlanType(string p_username, string p_premiumPlanType)
        {

        }
        public Abonement GetAbonement(string p_username)
        {
            IMongoCollection<Abonement> abonements = _database.GetCollection<Abonement>(DBConnectionConstants.ABONEMENT_COLLECTION);
            Abonement abonement = abonements.Find(p_abonement => p_abonement.Username.Equals(p_username)).FirstOrDefault();
            return abonement;
        }
        public Abonement GetAbonement(Abonement p_abonement)
        {
            IMongoCollection<Abonement> abonements = _database.GetCollection<Abonement>(DBConnectionConstants.ABONEMENT_COLLECTION);
            Abonement abonement = abonements.Find(p_abo => p_abo.Username.Equals(p_abonement.Username)).FirstOrDefault();
            return abonement;
        }

        public void UpdateAbonement(Abonement p_abonement)
        {
            IMongoCollection<Abonement> abonements = _database.GetCollection<Abonement>(DBConnectionConstants.ABONEMENT_COLLECTION);
            var updateDef = Builders<Abonement>.Update.Set(abonement => abonement.PremiumPlan, p_abonement.PremiumPlan);
            abonements.UpdateOne(abonement => abonement.Username == p_abonement.Username, updateDef);
        }
    }
}