using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using PayPal.v1.BillingAgreements;
using PayPal.v1.BillingPlans;
using RepositoryNotifier.Helper;
using RepositoryNotifier.Service;
using RepositoryNotifier.Service.Payment;

namespace RepositoryNotifier.Controllers
{
    [Route("api/[controller]/[action]/")]
    public class PaymentController : Controller
    {
        private IPayPalPaymentService _payPalPaymentService { get; set; }
        private IAbonementService _abonementService { get; set; }
        private IDonationService _donationService { get; set; }
        private ILogger<PaymentController> _logger {get;set;}

        public PaymentController(IConfiguration p_configuration, IPayPalPaymentService p_payPalPaymentService, IAbonementService p_abonementService, IDonationService p_donationService, ILogger<PaymentController> p_logger)
        {
            _payPalPaymentService = p_payPalPaymentService;
            _abonementService = p_abonementService;
            _donationService = p_donationService;
            _logger = p_logger;

        }

        [HttpPost]
        public async Task<IActionResult> CreatePayment([FromBody] double p_amount)
        {
            PayPal.v1.Payments.Payment result = await _payPalPaymentService.CreatePayment(p_amount);
            string approvalUrl = result.Links.FirstOrDefault(p_link => p_link.Rel.Equals("approval_url")).Href;

            if (string.IsNullOrEmpty(approvalUrl) || string.IsNullOrEmpty(result.Id)) {
                _logger.LogError("Could not create Payment. Result: {Result} Amount: {Amount} User: {User}", result, p_amount,AuthHelper.GetUsername(HttpContext));
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
                _donationService.AddDonation(result);

                _logger.LogInformation("Execute Payment successful. Result: {Result} PaymentID: {PaymentID} Token: {Token} PayerID: {PayerID} User: {User}", result, p_paymentID,p_token, p_payerID, AuthHelper.GetUsername(HttpContext));
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
        public async Task<IActionResult> CreateSubscription([FromBody] double p_amount)
        {
            Plan subscription = await _payPalPaymentService.CreateBillingPlan(p_amount);

            Plan activatedSubscription = await _payPalPaymentService.ActivateBillingPlan(subscription);
            if (activatedSubscription.State.Equals("ACTIVE"))
            {
                Agreement agreement = await _payPalPaymentService.CreateAgreement(activatedSubscription);

                if (agreement != null)
                {
                    string approvalUrl = agreement.Links.FirstOrDefault(p_link => p_link.Rel.Equals("approval_url")).Href;

                    if (string.IsNullOrEmpty(approvalUrl)){
                         _logger.LogError("Could not create Agreement. Agreement: {Agreement} ActivatedSubscription: {ActivatedSubscription} ApprovalUrl: {ApprovalUrl} User: {User}", agreement, activatedSubscription, approvalUrl, AuthHelper.GetUsername(HttpContext));
                    }

                    _logger.LogInformation("Create Agreement successful. Agreement: {Agreement} Amount: {Amount} User: {User}", agreement, p_amount ,AuthHelper.GetUsername(HttpContext));
                    return Ok(approvalUrl);
                }else{
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
            if (agreement.Plan.Id != null)
            {
                Plan plan = await _payPalPaymentService.GetBillingPlan(agreement.Plan.Id);
                if (plan.Id != null)
                {
                    string username = AuthHelper.GetLogin(this.HttpContext);
                    _abonementService.AddAbonement(plan, username);

                    _logger.LogInformation("Create Subscription successful. Agreement: {Agreement} Plan: {Plan} User: {User}", agreement, plan ,username);
                    return Redirect("/");
                }else{
                    _logger.LogError("Could not get BillingPlan after executing Agreement. Agreement: {Agreement} BillingPlan: {Plan} User: {User}", agreement, plan, AuthHelper.GetUsername(HttpContext));
                }
            }

            _logger.LogError("Could not execute Agreement. Agreement: {Agreement} User: {User}", agreement, AuthHelper.GetUsername(HttpContext));
            return BadRequest();
        }
    }
}