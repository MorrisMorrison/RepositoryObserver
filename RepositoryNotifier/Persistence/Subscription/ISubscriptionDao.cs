using MongoDB.Driver;

namespace RepositoryNotifier.Persistence.Subscription
{
    public interface ISubscriptionDao
    {
        void AddSubscription(Subscription p_subscription);
        void DeleteSubscription(Subscription p_abonement);
        void DeleteByPremiumPlanType(string p_username, string p_premiumPlanType);
        Subscription GetSubscription(string p_username);
        Subscription GetSubscription(Subscription p_subscription);
        bool UpdateSubscription(Subscription p_subscription);

    }
}