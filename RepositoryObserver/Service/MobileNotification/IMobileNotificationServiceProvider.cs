using System.Collections.Generic;
using System.Threading.Tasks;
using RepositoryNotifier.Config;
using Twilio.Rest.Api.V2010.Account;

namespace RepositoryNotifier.Service.SMS
{
    public interface IMobileNotificationServiceProvider
    {
         MobileNotificationConfig MobileNotificationConfig {get;set;}
         IList<MessageResource> Messages {get;set;}

         
         Task<MessageResource> CreateSMSNotification(string p_from, string p_to, string p_message);
         Task<MessageResource> CreateWhatsappNotification(string p_from, string p_to, string p_message);

    }
}