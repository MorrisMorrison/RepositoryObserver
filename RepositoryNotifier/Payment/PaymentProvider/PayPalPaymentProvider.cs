using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BraintreeHttp;
using Microsoft.Extensions.Configuration;
using PayPal.Core;
using PayPal.v1.Payments;
using RepositoryNotifier.Constants;

// https://github.com/paypal/PayPal-NET-SDK
// https://medium.com/@pmareke/using-paypal-sdk-with-net-core-full-explanation-66aab76cef66
// https://developer.paypal.com/docs/checkout/reference/server-integration/
namespace RepositoryNotifier.Payment.PaymentProvider
{
    public class PayPalPaymentProvider: IPayPalPaymentProvider
    {
        public SandboxEnvironment Environment { get; set; }
        public PayPalHttpClient Client { get; set; }

        public PayPalConfig PayPalConfig{get;set;}

        public PayPalPaymentProvider(IConfiguration p_configuration)
        {
            PayPalConfig = new PayPalConfig(p_configuration);
            Environment = new SandboxEnvironment(PayPalConfig.CLIENT_ID,
                PayPalConfig.CLIENT_SECRET);
            Client = new PayPalHttpClient(Environment);
        }


        public async Task<PayPal.v1.Payments.Payment> CreatePayment(double p_amount)
        {

            PayPal.v1.Payments.Payment payment = new PayPal.v1.Payments.Payment()
            {
                Intent = "AUTHORIZE",
                Transactions = new List<Transaction>()
                {
                    new Transaction()
                    {
                        Amount = new Amount()
                        {
                            Total = p_amount.ToString(),
                            Currency = "EUR"
                        }
                    }
                },
                RedirectUrls = new RedirectUrls()
                {
                    CancelUrl = "https://localhost:5001/api/payment/cancel",
                    ReturnUrl = "https://localhost:5001/api/payment/success"
                },
                Payer = new Payer()
                {
                PaymentMethod = "paypal"
                
            }
            };
            PaymentCreateRequest request = new PaymentCreateRequest();
            request.RequestBody(payment);
            PayPal.v1.Payments.Payment result = new PayPal.v1.Payments.Payment();
            try
            {
                HttpResponse response = await Client.Execute(request);
                var statusCode = response.StatusCode;
                result = response.Result<PayPal.v1.Payments.Payment>();
            }
            catch (HttpException httpException)
            {
                var statusCode = httpException.StatusCode;
                var debugId = httpException.Headers.GetValues("PayPal-Debug-Id").FirstOrDefault();
            }

            return result;
        }

        public async Task<PayPal.v1.Payments.Payment> ExecutePayment(string p_paymentID, string p_payerID){
            PaymentExecution paymentExecution = new PaymentExecution(){
                PayerId = p_payerID
            };

            PayPal.v1.Payments.Payment payment = new PayPal.v1.Payments.Payment() {
                Id = p_paymentID
            };

            PaymentExecuteRequest paymentExecuteRequest = new PaymentExecuteRequest(p_paymentID);
            paymentExecuteRequest.RequestBody(paymentExecution);
            PayPal.v1.Payments.Payment result = new PayPal.v1.Payments.Payment();
            try
            {
                HttpResponse response = await Client.Execute(paymentExecuteRequest);
                var statusCode = response.StatusCode;
                result = response.Result<PayPal.v1.Payments.Payment>();
            }
            catch (HttpException httpException)
            {
                var statusCode = httpException.StatusCode;
                var debugId = httpException.Headers.GetValues("PayPal-Debug-Id").FirstOrDefault();
            }

            return result;
        }


        public void Cancel(){
        }

    }
}