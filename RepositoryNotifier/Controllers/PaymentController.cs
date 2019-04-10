using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
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
        
        public PaymentController(IConfiguration p_configuration, IAbonementService p_abonementService, IDonationService p_donationService)
        {
            _payPalPaymentService = new PayPalPaymentService(p_configuration);
            _abonementService = p_abonementService;
            _donationService = p_donationService;

        }

        [HttpPost]
        public async Task<IActionResult> CreatePayment([FromBody] double p_amount)
        {
            PayPal.v1.Payments.Payment result = await _payPalPaymentService.CreatePayment(p_amount);
            string approvalUrl = result.Links.FirstOrDefault(p_link => p_link.Rel.Equals("approval_url")).Href;
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

                return Redirect("/");
            }

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
                    return Ok(approvalUrl);
                }
            }

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
                    return Redirect("/");
                }
            }

            return BadRequest();
        }
    }
}