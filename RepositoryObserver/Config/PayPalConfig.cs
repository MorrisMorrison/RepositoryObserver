using Microsoft.Extensions.Configuration;

namespace RepositoryNotifier.Constants
{
    public class PayPalConfig
    {
        public IConfiguration Configuration { get; }

        public string CLIENT_ID { get; }
        public string CLIENT_SECRET { get; }

        public PayPalConfig(IConfiguration p_configuration)
        {
            Configuration = p_configuration;
            CLIENT_ID = Configuration["PayPal:ClientID"];
            CLIENT_SECRET = Configuration["PayPal:ClientSecret"];
        }
    }
}