using System.Threading.Tasks;

namespace RepositoryNotifier.Service.Payment
{
    public interface IPayPalPaymentService
    {
          Task<PayPal.v1.Payments.Payment> CreatePayment(double p_amount);
          Task<PayPal.v1.Payments.Payment> ExecutePayment(string p_paymentID, string p_payerID);
          Task<PayPal.v1.BillingPlans.Plan> CreateBillingPlan(double p_amount);
          Task<PayPal.v1.BillingPlans.Plan> GetBillingPlan(string p_planId);
          Task<PayPal.v1.BillingPlans.Plan> ActivateBillingPlan(PayPal.v1.BillingPlans.Plan p_plan);
           Task<PayPal.v1.BillingAgreements.Agreement> CreateAgreement(PayPal.v1.BillingPlans.Plan p_plan);
           Task<PayPal.v1.BillingAgreements.Agreement> ExecuteAgreement(string p_token);
           void Cancel();
    }
}