using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Octokit;
using RepositoryNotifier.Constants;

namespace RepositoryNotifier.Service.Email
{
    public class EmailService:IEmailService
    {

        private MailAddress _sender { get; set; } 
        private string _host { get; set; } 
        private int _port { get; set; } 
        private string _subject { get; set; } 
        private string _senderUsername { get; set; } 
        private string _senderPassword { get; set; } 
        private EmailConfig _emailConfig { get; set; }
        private ILogger<IEmailService> _logger  {get;set;}

        public EmailService(IConfiguration p_configuration, ILogger<IEmailService> p_logger)
        {
            _emailConfig = new EmailConfig(p_configuration);
            _sender = new MailAddress(_emailConfig.SENDER_ADDRESS, _emailConfig.SENDER_DISPLAY_NAME);
            _host = _emailConfig.HOST;
            _port = _emailConfig.PORT;
            _subject = _emailConfig.SUBJECT;
            _senderUsername = _emailConfig.SENDER_USERNAME;
            _senderPassword = _emailConfig.SENDER_PASSWORD;
            _logger = p_logger;
        }

        public void SendNotificationMail(string p_userName, string p_userEmail, IList<SearchCodeResult> p_searchResults)
        {
            if (p_searchResults == null || p_searchResults.Count == 0) return;
            MailAddress to = new MailAddress(p_userEmail, p_userName);
            MailMessage mail = new MailMessage(_sender, to);
            mail.Subject = _subject;
            mail.Sender = _sender;
            SmtpClient client = new SmtpClient
            {
                Host = _host,
                Port = _port,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(_senderUsername, _senderPassword)
            };


            string itemTemplate = EmailTemplates.INIT_TEMPLATE;
            IList<string> items = new List<string>();
            foreach (SearchCodeResult p_searchResult in p_searchResults)
            {
                foreach (SearchCode searchCode in p_searchResult.Items)
                {
                    string item = string.Format(itemTemplate, searchCode.Repository, searchCode.Path,
                        searchCode.Name, searchCode.Url, searchCode.GitUrl);
                    items.Add(item);
                }
            }
            
                mail.Body = string.Format(EmailTemplates.BODY_TEMPLATE, p_userEmail,
                string.Join("\n", items));
            try
            {
                client.Send(mail);
                _logger.LogInformation("Sending Email {Email}", mail);
            }catch (Exception ex)
            {
                Debug.Print(ex.StackTrace);
                _logger.LogError(ex, "Could not send Email.");
            }
        }
    }



    
}