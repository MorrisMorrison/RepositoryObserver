using System.Threading.Tasks;
using PayPal.v1.BillingAgreements;
using PayPal.v1.BillingPlans;

namespace RepositoryNotifier.Service.Payment
{
    public interface IPayPalPaymentService
    {
          Task<PayPal.v1.Payments.Payment> CreatePayment(double p_amount);
          Task<PayPal.v1.Payments.Payment> ExecutePayment(string p_paymentID, string p_payerID);
          Task<Plan> CreateBillingPlan(double p_amount);
          Task<Plan> GetBillingPlan(string p_planId);
          Task<Plan> ActivateBillingPlan(PayPal.v1.BillingPlans.Plan p_plan);
           Task<Agreement> CreateAgreement(PayPal.v1.BillingPlans.Plan p_plan);
           Task<Agreement> ExecuteAgreement(string p_token);
           void Cancel();
    }
}