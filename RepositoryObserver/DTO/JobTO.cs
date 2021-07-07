using System;
using System.Collections.Generic;
using RepositoryNotifier.Persistence.Job;

namespace RepositoryNotifier.DTO
{
    public class CreateJobTO
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public IList<string> Repositories { get; set; }
        public JobFrequency Frequency { get; set; }
        public IList<string> SearchKeywords{get;set;}
        public bool EmailNotificationEnabled { get; set; }
        public bool SmsNotificationEnabled { get; set; }
        public bool WhatsappNotificationEnabled { get; set; }
        public bool SchedulerEnabled {get;set;}

    }


    public class JobResultTO{
        public string Name {get;set;}
        public string Path {get;set;}
        public string Url {get;set;}
        public string RepositoryName {get;set;}
        public DateTime CreatedAt {get;set;}
    }

}