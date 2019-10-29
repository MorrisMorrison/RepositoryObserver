using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using RepositoryNotifier.Constants;
using RepositoryNotifier.Helper;

namespace RepositoryNotifier.Persistence.Subscription
{
    public class SubscriptionDao : ISubscriptionDao
    {

        private IMongoDatabase _database { get; set; }
        private ILogger<SubscriptionDao> _logger { get; set; }
        public SubscriptionDao(IDbConnectionProvider p_dbConnectionProvider, ILogger<SubscriptionDao> p_logger)
        {
            _database = p_dbConnectionProvider.GetDatabaseConnection();
            _logger = p_logger;
        }


        public void AddSubscription(Subscription p_subscription)
        {
            IMongoCollection<Subscription> subscriptions = _database.GetCollection<Subscription>(DBConnectionConstants.SUBSCRIPTION_COLLECTION);
            subscriptions.InsertOne(p_subscription);
        }
        public void DeleteSubscription(Subscription p_subscription)
        {
            IMongoCollection<Subscription> subscriptions = _database.GetCollection<Subscription>(DBConnectionConstants.SUBSCRIPTION_COLLECTION);
            DeleteResult result = subscriptions.DeleteOne(p_item => p_item.Id.Equals(p_subscription.Id) || p_item.Username.Equals(p_subscription.Username));

            if (!result.IsAcknowledged) _logger.LogError("Could not delete Abonement: {Abonement} Result: {Result}", p_subscription, result);
        }
        public void DeleteByPremiumPlanType(string p_username, string p_premiumPlanType)
        {

        }
        public Subscription GetSubscription(string p_username)
        {
            IMongoCollection<Subscription> subscriptions = _database.GetCollection<Subscription>(DBConnectionConstants.SUBSCRIPTION_COLLECTION);
            Subscription subscription = subscriptions.Find(p_subscription => p_subscription.Username.Equals(p_username)).FirstOrDefault();
            return subscription;
        }
        public Subscription GetSubscription(Subscription p_subscription)
        {
            IMongoCollection<Subscription> subscriptions = _database.GetCollection<Subscription>(DBConnectionConstants.SUBSCRIPTION_COLLECTION);
            Subscription subscription = subscriptions.Find(p_abo => p_abo.Username.Equals(p_subscription.Username)).FirstOrDefault();
            return subscription;
        }

        public bool UpdateSubscription(Subscription p_subscription)
        {
            IMongoCollection<Subscription> subscriptions = _database.GetCollection<Subscription>(DBConnectionConstants.SUBSCRIPTION_COLLECTION);
            var updateDef = Builders<Subscription>.Update
            .Set(subscription => subscription.PremiumPlan, p_subscription.PremiumPlan)
            .Set(subscription => subscription.Active , p_subscription.Active)
            .Set(subscription => subscription.BillingAddress , p_subscription.BillingAddress);
            UpdateResult result = subscriptions.UpdateOne(subscription => subscription.Username == p_subscription.Username, updateDef);
            if (result.IsAcknowledged)
            {
                return true;
            }
            _logger.LogError("Could not update Abonement: {Abonement} Result: {Result}", p_subscription, result);
            return false;
        }
    }
}