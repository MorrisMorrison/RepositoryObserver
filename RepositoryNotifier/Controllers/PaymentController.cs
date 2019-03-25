using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RepositoryNotifier.Payment.PaymentProvider;

namespace RepositoryNotifier.Controllers
{
    [Route("api/[controller]/[action]/")]
    public class PaymentController : Controller
    {
        private PayPalPaymentProvider _payPalPaymentProvider { get; set; }
        public PaymentController()
        {
            _payPalPaymentProvider = new PayPalPaymentProvider();
        }
        [HttpGet]

        public async Task<IActionResult> Create()
        {
            PayPal.v1.Payments.Payment result = await _payPalPaymentProvider.CreatePayment();
            string approvalUrl = result.Links.FirstOrDefault(p_link => p_link.Rel.Equals("approval_url")).Href;
            return Ok(approvalUrl);
        }

        [HttpGet]
        public async Task<IActionResult> Success(string p_paymentID, string p_token, string p_payerID)
        {
            PayPal.v1.Payments.Payment result = await _payPalPaymentProvider.ExecutePayment(p_paymentID, p_payerID);
            return Ok();
        }
        [HttpGet]
        public async Task<IActionResult> Cancel()
        {
            return Ok();
        }
    }
}