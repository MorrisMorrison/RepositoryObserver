using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using PayPal.v1.BillingAgreements;
using PayPal.v1.BillingPlans;
using RepositoryNotifier.DTO;
using RepositoryNotifier.Helper;
using RepositoryNotifier.Persistence;
using RepositoryNotifier.Persistence.Subscription;
using RepositoryNotifier.Service;
using RepositoryNotifier.Service.Payment;

namespace RepositoryNotifier.Controllers
{
    [Route("api/[controller]/[action]/")]
    public class PaymentController : Controller
    {
        private IPayPalPaymentService _payPalPaymentService { get; set; }
        private ISubscriptionService _subscriptionService { get; set; }
        private IDonationService _donationService { get; set; }
        private ILogger<PaymentController> _logger { get; set; }

        public PaymentController(IConfiguration p_configuration, IPayPalPaymentService p_payPalPaymentService, ISubscriptionService p_subscriptionService, IDonationService p_donationService, ILogger<PaymentController> p_logger)
        {
            _payPalPaymentService = p_payPalPaymentService;
            _subscriptionService = p_subscriptionService;
            _donationService = p_donationService;
            _logger = p_logger;

        }

        [HttpPost]
        public async Task<IActionResult> CreatePayment([FromBody] double p_amount)
        {
            string baseUrl = Request.Scheme + "://" + Request.Host.Value;

            PayPal.v1.Payments.Payment result = await _payPalPaymentService.CreatePayment(p_amount, baseUrl);
            string approvalUrl = result.Links.FirstOrDefault(p_link => p_link.Rel.Equals("approval_url")).Href;

            if (string.IsNullOrEmpty(approvalUrl) || string.IsNullOrEmpty(result.Id))
            {
                _logger.LogError("Could not create Payment. Result: {Result} Amount: {Amount} User: {User}", result, p_amount, AuthHelper.GetUsername(HttpContext));
            }

            _logger.LogInformation("Create Payment successful. Result: {Result} Amount: {Amount} User: {User}", result, p_amount, AuthHelper.GetUsername(HttpContext));
            return Ok(approvalUrl);
        }

        [HttpGet]
        public async Task<IActionResult> SuccessPayment([FromQuery(Name = "paymentID")]string p_paymentID, string p_token, [FromQuery(Name = "payerID")] string p_payerID)
        {
            PayPal.v1.Payments.Payment result = await _payPalPaymentService.ExecutePayment(p_paymentID, p_payerID);

            if (result != null)
            {
                string username = AuthHelper.GetLogin(this.HttpContext);
                _donationService.AddDonation(result, username);

                _logger.LogInformation("Execute Payment successful. Result: {Result} PaymentID: {PaymentID} Token: {Token} PayerID: {PayerID} User: {User}", result, p_paymentID, p_token, p_payerID, AuthHelper.GetUsername(HttpContext));
                return Redirect("/");
            }

            _logger.LogError("Could not execute Payment. Result: {Result} PaymentID: {PaymentID} Token: {Token} PayerID: {PayerID} User: {User}", result, p_paymentID, p_token, p_payerID, AuthHelper.GetUsername(HttpContext));
            return BadRequest();
        }
        [HttpGet]
        public async Task<IActionResult> CancelPayment()
        {
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> CreateSubscription([FromBody] CreateSubscriptionTO p_createSubscriptionTO)
        {
            string baseUrl = Request.Scheme + "://" + Request.Host.Value;

            Plan subscription = await _payPalPaymentService.CreateBillingPlan(p_createSubscriptionTO.Amount, baseUrl);

            Plan activatedSubscription = await _payPalPaymentService.ActivateBillingPlan(subscription);
            if (activatedSubscription.State.Equals("ACTIVE"))
            {
                Agreement agreement = await _payPalPaymentService.CreateAgreement(activatedSubscription, p_createSubscriptionTO.BillingAddress);

                if (agreement != null)
                {
                    string approvalUrl = agreement.Links.FirstOrDefault(p_link => p_link.Rel.Equals("approval_url")).Href;

                    if (string.IsNullOrEmpty(approvalUrl))
                    {
                        _logger.LogError("Could not create Agreement. Agreement: {Agreement} ActivatedSubscription: {ActivatedSubscription} ApprovalUrl: {ApprovalUrl} User: {User}", agreement, activatedSubscription, approvalUrl, AuthHelper.GetUsername(HttpContext));
                    }

                    string username = AuthHelper.GetLogin(HttpContext);
                    _subscriptionService.AddSubscription(subscription, p_createSubscriptionTO.BillingAddress, username);

                    _logger.LogInformation("Create Agreement successful. Agreement: {Agreement} Amount: {Amount} User: {User}", agreement, p_createSubscriptionTO.Amount, AuthHelper.GetUsername(HttpContext));
                    return Ok(approvalUrl);
                }
                else
                {
                    _logger.LogError("Could not create Agreement. Agreement: {Agreement} ActivatedSubscription: {ActivatedSubscription} User: {User}", agreement, activatedSubscription, AuthHelper.GetUsername(HttpContext));
                }
            }

            _logger.LogError("Could not activate BillingPlan. BillingPlan: {Plan} ActivatedBillingPlan: {ActivatedBillingPlan} User: {User}", subscription, activatedSubscription, AuthHelper.GetUsername(HttpContext));
            return BadRequest();
        }


        [HttpGet]
        public async Task<IActionResult> SuccessSubscription([FromQuery(Name = "token")]string p_token)
        {
            Agreement agreement = await _payPalPaymentService.ExecuteAgreement(p_token);
            if (agreement.Id != null)
            {
                string username = AuthHelper.GetLogin(this.HttpContext);
                _subscriptionService.ActivateSubscription(username);
                _logger.LogInformation("Create Subscription successful. Agreement: {Agreement} User: {User}", agreement, username);
                return Redirect("/payments");
            }

            _logger.LogError("Could not execute Agreement. Agreement: {Agreement} User: {User}", agreement, AuthHelper.GetLogin(HttpContext));
            return BadRequest();
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSubscriptions()
        {
            string username = AuthHelper.GetLogin(HttpContext);
            Subscription subscription = _subscriptionService.GetSubscription(username);

            if (subscription != null)
            {
                return Ok(subscription);
            }

            return BadRequest();
        }

        [HttpGet]
        public async Task<IActionResult> GetSubscription()
        {

            string username = AuthHelper.GetLogin(HttpContext);
            Subscription subscription = _subscriptionService.GetSubscription(username);

            if (subscription != null)
            {
                return Ok(subscription);
            }

            return BadRequest();
        }

        [HttpGet]
        public async Task<IActionResult> GetAllDonations()
        {
            string username = AuthHelper.GetLogin(HttpContext);
            IList<Donation> donations = _donationService.GetAllDonations(username);

            if (donations != null && donations.Count > 0)
            {
                return Ok(donations);
            }

            return BadRequest();

        }


        [HttpPut]
        public async Task<IActionResult> CancelSubscription()
        {
            string username = AuthHelper.GetLogin(HttpContext);
            bool result = _subscriptionService.CancelSubscription(username);

            if (result)
            {
                return Ok();
            }

            return BadRequest();
        }


        [HttpPut]
        public async Task<IActionResult> UpdateBillingAddress([FromBody] BillingAddress p_billingAddress)
        {
            string username = AuthHelper.GetLogin(HttpContext);
            bool result = _subscriptionService.UpdateBillingAddress(username, p_billingAddress);

            if (result)
            {
                return Ok();
            }

            return BadRequest();
        }


    }
}