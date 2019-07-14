using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using RepositoryNotifier.Config;
using Twilio;
using Twilio.Clients;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

namespace RepositoryNotifier.Service.SMS
{
    public class TwilioMobileNotificationServiceProvider:IMobileNotificationServiceProvider
    {
        private readonly ITwilioRestClient _client;

        public MobileNotificationConfig MobileNotificationConfig { get; set; }
        public IList<MessageResource> Messages {get;set;}

        public TwilioMobileNotificationServiceProvider(IConfiguration p_configuration)
        {
            MobileNotificationConfig = new MobileNotificationConfig(p_configuration);
//            _client = new TwilioRestClient(
                //                MobileNotificationConfig.ACCOUNT_SID,
                //                MobileNotificationConfig.AUTH_TOKEN
                //            );
                
                TwilioClient.Init(MobileNotificationConfig.ACCOUNT_SID, MobileNotificationConfig.AUTH_TOKEN);
                
                Messages = new List<MessageResource>();
        }

        
        public async Task<MessageResource> CreateSMSNotification(string p_from, string p_to, string p_message)
        {
            MessageResource message = await MessageResource.CreateAsync(
                from: new PhoneNumber(p_from),
                to: new PhoneNumber(p_to),
                body: p_message
//                statusCallback: new Uri("https://localhost:5001/api/sms/callback"),
                );

            if (message != null)
            {
                Messages.Add(message);
            }

            return message;
        }
        
        public async Task<MessageResource> CreateWhatsappNotification(string p_from, string p_to, string p_message)
        {
            MessageResource message = await MessageResource.CreateAsync(
                from: new PhoneNumber("whatsapp:" + p_from),
                to: new PhoneNumber("whatsapp:" +  p_to),
                body: p_message
//                statusCallback: new Uri("https://localhost:5001/api/sms/callback"),
                );

            if (message != null)
            {
                Messages.Add(message);
            }

            return message;
        }
        
        

    }
}