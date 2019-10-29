using System;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using RepositoryNotifier.DTO;
using RepositoryNotifier.Helper;
using RepositoryNotifier.Persistence.Subscription;

namespace RepositoryNotifier.Service
{
    public class SubscriptionService:ISubscriptionService
    {

        private ISubscriptionDao _subscriptionDao{get;set;}
        private IPremiumPlanService _premiumPlanService {get;set;}

        private ILogger<SubscriptionService> _logger {get;set;}

        public SubscriptionService(ISubscriptionDao p_subscriptionDao, IPremiumPlanService p_premiumPlanService, ILogger<SubscriptionService> p_logger)
        {
            _subscriptionDao = p_subscriptionDao;
            _premiumPlanService = p_premiumPlanService;
            _logger = p_logger;
        }

        public bool SubscriptionExists(string p_username)
        {
            Subscription subscription = _subscriptionDao.GetSubscription(p_username);
            if (subscription != null) return true;
            return false;
        }

        public void AddSubscription(PayPal.v1.BillingPlans.Plan p_plan, BillingAddress p_billingAddress, string p_username){
            double amount = double.Parse(p_plan.PaymentDefinitions[0].Amount.Value);
            Persistence.Payment payment = new Persistence.Payment(){
                Amount = amount,
                PaymentDate = DateTime.Now,
                PaymentType ="PayPal",
                BillingAddress = p_billingAddress
            };

            IList<Persistence.Payment> payments = new List<Persistence.Payment>();
            payments.Add(payment);

            string premiumPlanType = _premiumPlanService.GetPremiumPlanType(amount);
            double price = _premiumPlanService.GetPremiumPlanPrice(premiumPlanType);

            PremiumPlan premiumPlan = new PremiumPlan(){
                Name = premiumPlanType,
                Payments = payments,
                Price = amount,
                BuyingDate = DateTime.Now,
            };

            Subscription subscription = new Subscription(){
                Username = p_username,
                PremiumPlan = premiumPlan,
                Active = false,
                BillingAddress = p_billingAddress
            };
            _subscriptionDao.AddSubscription(subscription);
        }

        public Subscription GetSubscription(string p_username)
        {
            return _subscriptionDao.GetSubscription(p_username);
        }

        public void UpdateSubscription(Subscription p_subscription)
        {
            _subscriptionDao.UpdateSubscription(p_subscription);
        }

        public bool ActivateSubscription(string p_username)
        {
            Subscription subscription = _subscriptionDao.GetSubscription(p_username);
            subscription.Active = true;
            return _subscriptionDao.UpdateSubscription(subscription);
        }

        public bool CancelSubscription(string p_username)
        {
            Subscription subscription = _subscriptionDao.GetSubscription(p_username);
            subscription.Active = false;
            return _subscriptionDao.UpdateSubscription(subscription);
        }

        public bool UpdateBillingAddress(string p_username, BillingAddress p_billingAddress){
            Subscription subscription = _subscriptionDao.GetSubscription(p_username);
            subscription.BillingAddress = p_billingAddress;
            return _subscriptionDao.UpdateSubscription(subscription);
        }
    }
}