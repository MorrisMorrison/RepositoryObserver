using System;
using System.Collections.Generic;
using RepositoryNotifier.Helper;
using RepositoryNotifier.Persistence;

namespace RepositoryNotifier.Service
{
    public class AbonementService: IAbonementService
    {

        private IAbonementDao _abonementDao{get;set;}
        private IPremiumPlanService _premiumPlanService {get;set;}

        public AbonementService(IAbonementDao p_abonementDao, IPremiumPlanService p_premiumPlanService)
        {
            _abonementDao = p_abonementDao;
            _premiumPlanService = p_premiumPlanService;
        }

        public bool AbonementExists(string p_username)
        {
            Abonement abonement = _abonementDao.GetAbonement(p_username);
            if (abonement != null) return true;
            return false;
        }

        public void AddAbonement(PayPal.v1.BillingPlans.Plan p_plan, string p_username){

            double amount = double.Parse(p_agreement.Plan.Id);
            Persistence.Payment payment = new Persistence.Payment(){
                Amount = amount,
                PaymentDate = DateTime.Now
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

            Abonement abonement = new Abonement(){
                Username = p_username,
                PremiumPlan = premiumPlan,
            };

            _abonementDao.AddAbonement(abonement);
        }

        public Abonement GetAbonement(string p_username)
        {
            return _abonementDao.GetAbonement(p_username);
        }

        public void UpdateAbonement(Abonement p_abonement)
        {
            _abonementDao.UpdateAbonement(p_abonement);
        }
    }
}