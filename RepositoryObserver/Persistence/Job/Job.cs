using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace RepositoryNotifier.Persistence.Job
{
    public class Job
    {
        [BsonId]
        public ObjectId Id { get; set; }
        
        [BsonElement("username")]
        public string Username { get; set; }

        [BsonElement("email")]
        public string Email { get; set; }

        [BsonElement("emailNotificationEnabled")]
        public bool EmailNotificationEnabled {get;set;}

        [BsonElement("repositories")]
        public IList<string> Repositories { get; set; }

        [BsonElement("frequency")]
        public JobFrequency Frequency { get; set; }

        [BsonElement("searchKeywords")]
        public IList<string> SearchKeywords { get; set; }

        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; }

        [BsonElement("updatedAt")]
        public DateTime UpdatedAt { get; set; }

        [BsonElement("lastExecutedAt")]
        public DateTime LastExecutedAt { get; set; }

        [BsonElement("status")]
        public string Status { get; set; }

        [BsonElement("result")]
        public IList<JobResult> Results {get;set;}

        [BsonElement("smsNotificationEnabled")]
        public bool SmsNotificationEnabled{get;set;}

        [BsonElement("phoneNumber")]
        public string PhoneNumber {get;set;}
        
        [BsonElement("whatsappNotificationEnabled")]
        public bool WhatsappNotificationEnabled { get; set; }

        [BsonElement("schedulerEnabled")]
        public bool SchedulerEnabled {get;set;}
    }
}