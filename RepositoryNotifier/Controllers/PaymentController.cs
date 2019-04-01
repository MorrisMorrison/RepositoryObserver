using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using RepositoryNotifier.Helper;
using RepositoryNotifier.Payment.PaymentProvider;
using RepositoryNotifier.Service;

namespace RepositoryNotifier.Controllers
{
    [Route("api/[controller]/[action]/")]
    public class PaymentController : Controller
    {
        private PayPalPaymentProvider _payPalPaymentProvider { get; set; }
        private IAbonementService _abonementService { get; set; }
        private IDonationService _donationService {get;set;}
        public PaymentController(IConfiguration p_configuration, IAbonementService p_abonementService, IDonationService p_donationService)
        {
            _payPalPaymentProvider = new PayPalPaymentProvider(p_configuration);
            _abonementService = p_abonementService;
            _donationService =p_donationService;

        }

        [HttpPost]
        public async Task<IActionResult> CreatePayment([FromBody] double p_amount)
        {
            PayPal.v1.Payments.Payment result = await _payPalPaymentProvider.CreatePayment(p_amount);
            string approvalUrl = result.Links.FirstOrDefault(p_link => p_link.Rel.Equals("approval_url")).Href;
            return Ok(approvalUrl);
        }

        [HttpGet]
        public async Task<IActionResult> SuccessPayment([FromQuery(Name = "paymentID")]string p_paymentID, string p_token, [FromQuery(Name = "payerID")] string p_payerID)
        {
            PayPal.v1.Payments.Payment result = await _payPalPaymentProvider.ExecutePayment(p_paymentID, p_payerID);

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
            PayPal.v1.BillingPlans.Plan subscription = await _payPalPaymentProvider.CreateBillingPlan(p_amount);

            PayPal.v1.BillingPlans.Plan activatedSubscription =  await _payPalPaymentProvider.ActivateBillingPlan(subscription);
            if (activatedSubscription.State.Equals("ACTIVE")){
                    PayPal.v1.BillingAgreements.Agreement agreement = await _payPalPaymentProvider.CreateAgreement(activatedSubscription);

                    if(agreement != null){
                                 string approvalUrl = agreement.Links.FirstOrDefault(p_link => p_link.Rel.Equals("approval_url")).Href;
                                    return Ok(approvalUrl);
                    }
            }

            return BadRequest();
        }

        
        [HttpGet]
        public async Task<IActionResult> SuccessSubscription([FromQuery(Name = "token")]string p_token)
        {
            PayPal.v1.BillingAgreements.Agreement agreement = await _payPalPaymentProvider.ExecuteAgreement(p_token);

            if (agreement != null)
            {
                string username = AuthHelper.GetLogin(this.HttpContext);
                // _abonementService.AddAbonement(agreement, username);
                return Redirect("/");
            }

            return BadRequest();
        }


    }
}