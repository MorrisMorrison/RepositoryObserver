using Microsoft.Extensions.Configuration;

namespace RepositoryNotifier.Constants
{
    public class EmailConfig
    {
        public IConfiguration Configuration { get; }

        public string SENDER_ADDRESS { get; }
        public string SENDER_DISPLAY_NAME { get; }
        public string HOST { get; }
        public int PORT { get; }
        public string SUBJECT { get; }
        public string SENDER_USERNAME { get; }
        public string SENDER_PASSWORD { get; }

        public EmailConfig(IConfiguration p_configuration)
        {
            Configuration = p_configuration;
            SENDER_ADDRESS = Configuration["Email:SenderAddress"];
            SENDER_DISPLAY_NAME = Configuration["Email:SenderDisplayName"];
            HOST = Configuration["Email:Host"];
            PORT = int.Parse(Configuration["Email:Port"]);
            SUBJECT = Configuration["Email:Subject"];
            SENDER_USERNAME = Configuration["Email:SenderUsername"];
            SENDER_PASSWORD = Configuration["Email:SenderPassword"];
        }
    }
}