using System;
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
    public class PayPalPaymentProvider : IPayPalPaymentProvider
    {
        public SandboxEnvironment Environment { get; set; }
        public PayPalHttpClient Client { get; set; }

        public PayPalConfig PayPalConfig { get; set; }

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
                    CancelUrl = "https://localhost:5001/api/payment/cancelpayment",
                    ReturnUrl = "https://localhost:5001/api/payment/successpayment"
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

        public async Task<PayPal.v1.Payments.Payment> ExecutePayment(string p_paymentID, string p_payerID)
        {
            PaymentExecution paymentExecution = new PaymentExecution()
            {
                PayerId = p_payerID
            };

            PayPal.v1.Payments.Payment payment = new PayPal.v1.Payments.Payment()
            {
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



        public async Task<PayPal.v1.BillingPlans.Plan> CreateSubscription(double p_amount)
        {
            PayPal.v1.BillingPlans.Plan billingPlan = new PayPal.v1.BillingPlans.Plan()
            {
                Name = "Plan",
                Description = "Plan",
                Type = "fixed",
                PaymentDefinitions = new List<PayPal.v1.BillingPlans.PaymentDefinition>(){
                        new PayPal.v1.BillingPlans.PaymentDefinition(){
                            Name="Regular",
                            Type="REGULAR",
                            Frequency ="MONTH",
                            FrequencyInterval ="2",
                            Amount = new PayPal.v1.BillingPlans.Currency(){
                                Value = p_amount.ToString(),
                                CurrencyCode ="EUR"
                            },
                            Cycles ="12",
                        },
                    },

                MerchantPreferences = new PayPal.v1.BillingPlans.MerchantPreferences()
                {
                    ReturnUrl = "https://localhost:5001/api/payment/successsubscription",
                    CancelUrl = "https://localhost:5001/api/payment/cancelsubscription",
                    AutoBillAmount = "YES",
                    InitialFailAmountAction = "CONTINUE",
                    MaxFailAttempts = "0"
                },
            };

            PayPal.v1.BillingPlans.PlanCreateRequest request = new PayPal.v1.BillingPlans.PlanCreateRequest();
            request.RequestBody(billingPlan);
            PayPal.v1.BillingPlans.Plan result = new PayPal.v1.BillingPlans.Plan();
            try
            {
                HttpResponse response = await Client.Execute(request);
                var statusCode = response.StatusCode;
                result = response.Result<PayPal.v1.BillingPlans.Plan>();
            }
            catch (HttpException httpException)
            {
                var statusCode = httpException.StatusCode;
                var debugId = httpException.Headers.GetValues("PayPal-Debug-Id").FirstOrDefault();
            }

            return result;
        }

        public async Task<PayPal.v1.BillingPlans.Plan> ActivateSubscription(PayPal.v1.BillingPlans.Plan p_plan)
        {
            PayPal.v1.BillingPlans.PlanUpdateRequest<PayPal.v1.BillingPlans.Plan> request = new PayPal.v1.BillingPlans.PlanUpdateRequest<PayPal.v1.BillingPlans.Plan>(p_plan.Id);
            PayPal.v1.BillingPlans.JsonPatch<PayPal.v1.BillingPlans.Plan> patch = new PayPal.v1.BillingPlans.JsonPatch<PayPal.v1.BillingPlans.Plan>()
            {
                Op = "replace",
                Path = "/",
                Value = new PayPal.v1.BillingPlans.Plan() { State = "ACTIVE" }
            };
            request.RequestBody(new List<PayPal.v1.BillingPlans.JsonPatch<PayPal.v1.BillingPlans.Plan>>(){
                patch
            });


            System.Net.HttpStatusCode statusCode = new System.Net.HttpStatusCode();
            try
            {
                HttpResponse response = await Client.Execute(request);
                statusCode = response.StatusCode;
                p_plan.State = "ACTIVE";
            }
            catch (HttpException httpException)
            {
                statusCode = httpException.StatusCode;
                var debugId = httpException.Headers.GetValues("PayPal-Debug-Id").FirstOrDefault();
            }

            return p_plan;
        }

        public async Task<PayPal.v1.BillingAgreements.Agreement> CreateAgreement(PayPal.v1.BillingPlans.Plan p_plan){
            PayPal.v1.BillingAgreements.Agreement agreement = new PayPal.v1.BillingAgreements.Agreement(){
                Name="RO Sub",
                Description ="RO Sub Desc",
                StartDate = DateTime.Now.ToString(),
                Plan = new PayPal.v1.BillingAgreements.PlanWithId(){
                    Id = p_plan.Id
                },
                Payer = new PayPal.v1.BillingAgreements.Payer(){
                    PaymentMethod ="paypal"
                },
            };

            PayPal.v1.BillingAgreements.AgreementCreateRequest request = new PayPal.v1.BillingAgreements.AgreementCreateRequest(){
                Body = agreement
            };

            PayPal.v1.BillingAgreements.Agreement result = new PayPal.v1.BillingAgreements.Agreement();
            try
            {
                HttpResponse response = await Client.Execute(request);
                var statusCode = response.StatusCode;
                result = response.Result<PayPal.v1.BillingAgreements.Agreement>();
            }
            catch (HttpException httpException)
            {
                var statusCode = httpException.StatusCode;
                var debugId = httpException.Headers.GetValues("PayPal-Debug-Id").FirstOrDefault();
            }

            return result;
        }

        public async Task<PayPal.v1.BillingAgreements.Agreement> ExecuteAgreement(string p_token){
            PayPal.v1.BillingAgreements.AgreementExecuteRequest request = new PayPal.v1.BillingAgreements.AgreementExecuteRequest(p_token);

            PayPal.v1.BillingAgreements.Agreement result = new PayPal.v1.BillingAgreements.Agreement();
            try
            {
                HttpResponse response = await Client.Execute(request);
                var statusCode = response.StatusCode;
                result = response.Result<PayPal.v1.BillingAgreements.Agreement>();
            }
            catch (HttpException httpException)
            {
                var statusCode = httpException.StatusCode;
                var debugId = httpException.Headers.GetValues("PayPal-Debug-Id").FirstOrDefault();
            }

            return result;
        }


        public void Cancel()
        {
        }

    }
}