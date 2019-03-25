using System.Collections.Generic;
using RepositoryNotifier.TaskScheduler;

namespace RepositoryNotifier.DTO
{
    public class AddNotificationTO
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public IList<string> Repositories { get; set; }
        public Frequency Frequency { get; set; }
        public IList<string> SearchKeywords{get;set;}
    }

    public class UpdateNotificationTO{
        public string Username { get; set; }
        public string Email { get; set; }
        public IList<string> Repositories { get; set; }
        public Frequency Frequency { get; set; }
        public IList<string> SearchKeywords{get;set;}
    }
}