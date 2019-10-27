using RepositoryNotifier.Persistence.Subscription;

namespace RepositoryNotifier.Service
{
    public interface ISubscriptionService
    {
         void AddSubscription(PayPal.v1.BillingPlans.Plan p_plan, BillingAddress p_billingAddress, string p_username);
         
         Subscription GetSubscription(string p_username);

         void UpdateSubscription(Subscription p_abonement);

         bool SubscriptionExists(string p_username);

         bool ActivateSubscription(string p_username);
    }
}