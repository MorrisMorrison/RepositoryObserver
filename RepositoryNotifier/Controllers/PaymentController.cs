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
        private IAbonementService _abonementService {get;set;}
        public PaymentController(IConfiguration p_configuration, IAbonementService p_abonementService)
        {
            _payPalPaymentProvider = new PayPalPaymentProvider(p_configuration);
            _abonementService = p_abonementService;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] double p_amount)
        {
            PayPal.v1.Payments.Payment result = await _payPalPaymentProvider.CreatePayment(p_amount);
            string approvalUrl = result.Links.FirstOrDefault(p_link => p_link.Rel.Equals("approval_url")).Href;
            return Ok(approvalUrl);
        }

        [HttpGet]
        public async Task<IActionResult> Success([FromQuery(Name="paymentID")]string p_paymentID, string p_token,[FromQuery(Name="payerID")] string p_payerID)
        {
            PayPal.v1.Payments.Payment result = await _payPalPaymentProvider.ExecutePayment(p_paymentID, p_payerID);

            if (result != null){
            string username = AuthHelper.GetLogin(this.HttpContext);
            _abonementService.AddAbonement(result, username);
            return Ok();
            }

            return BadRequest();
        }
        [HttpGet]
        public async Task<IActionResult> Cancel()
        {
            return Ok();
        }
    }
}