using Microsoft.Extensions.Configuration;

namespace RepositoryNotifier.Config
{
    public class MobileNotificationConfig
    {
        public IConfiguration Configuration { get; }
        public string SMS_PHONE_NUMBER { get; }
        public string WHATSAPP_PHONE_NUMBER { get; }

        public string ACCOUNT_SID { get; }
        public string AUTH_TOKEN { get; }
        
        public MobileNotificationConfig(IConfiguration p_configuration)
        {
            Configuration = p_configuration;
            SMS_PHONE_NUMBER = Configuration["MobileNotification:SMSPhoneNumber"];
            WHATSAPP_PHONE_NUMBER = Configuration["MobileNotification:WhatsappPhoneNumber"];
            ACCOUNT_SID = Configuration["MobileNotification:AccountSid"];
            AUTH_TOKEN = Configuration["MobileNotification:AuthToken"];
        }
    }
}