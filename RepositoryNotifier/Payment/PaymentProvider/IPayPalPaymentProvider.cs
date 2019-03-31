using System.Threading.Tasks;

namespace RepositoryNotifier.Payment.PaymentProvider
{
    public interface IPayPalPaymentProvider
    {
          Task<PayPal.v1.Payments.Payment> CreatePayment(double p_amount);
          Task<PayPal.v1.Payments.Payment> ExecutePayment(string p_payerID, string p_paymentID);
    }
}