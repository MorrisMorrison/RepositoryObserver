using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using RepositoryNotifier.Config;
using Twilio.Rest.Api.V2010.Account;

namespace RepositoryNotifier.Service.SMS
{
    public class MobileNotificationService:IMobileNotificationService
    {
        public IMobileNotificationServiceProvider MobileNotificationServiceProvider { get; set; }
        public MobileNotificationConfig MobileNotificationConfig { get; set; }

        public MobileNotificationService(IConfiguration p_configuration, IMobileNotificationServiceProvider p_mobileNotificationServiceProvider)
        {
            MobileNotificationServiceProvider = p_mobileNotificationServiceProvider;
            MobileNotificationConfig = new MobileNotificationConfig(p_configuration);
        }

        public async Task<MessageResource> CreateSMSNotification(string p_to, string p_message, string p_from = null)
        {
            string from;
            
            if (p_from == null)
            {
                from = MobileNotificationConfig.SMS_PHONE_NUMBER;
            }
            else
            {
                from = p_from;
            }
            
            return await MobileNotificationServiceProvider.CreateSMSNotification(from, p_to, p_message);
        }    


        public async Task<MessageResource> CreateWhatsappNotification( string p_to, string p_message, string p_from = null)
        {
            string from;
            
            if (p_from == null)
            {
                from = MobileNotificationConfig.WHATSAPP_PHONE_NUMBER;
            }
            else
            {
                from = p_from;
            }
            
            return await MobileNotificationServiceProvider.CreateWhatsappNotification(from, p_to, p_message);
        }
    }
}