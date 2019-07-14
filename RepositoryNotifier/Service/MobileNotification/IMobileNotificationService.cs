using System.Threading.Tasks;
using Twilio.Rest.Api.V2010.Account;

namespace RepositoryNotifier.Service.SMS
{
    public interface IMobileNotificationService
    {
        IMobileNotificationServiceProvider MobileNotificationServiceProvider {get;set;}

        Task<MessageResource> CreateSMSNotification(string p_to, string p_message ,string p_from);

        Task<MessageResource> CreateWhatsappNotification(string p_to, string p_message, string p_from);

    }
}