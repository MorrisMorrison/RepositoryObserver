using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using RepositoryNotifier.TaskScheduler;
using RepositoryNotifier.Constants;

namespace RepositoryNotifier.Persistence
{
    public class NotificationTask
    {
        [BsonId]
        public ObjectId Id { get; set; }

        [BsonElement("username")]
        public string Username { get; set; }

        [BsonElement("email")]
        public string Email { get; set; }

        [BsonElement("repositories")]
        public IList<string> Repositories { get; set; }

        [BsonElement("frequency")]
        public Frequency Frequency { get; set; }

        [BsonElement("searchKeywords")]
        public IList<string> SearchKeywords {get;set;}

        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; }
        [BsonElement("updatedAt")]
        public DateTime UpdatedAt { get; set; }
        [BsonElement("lastExecutedAt")]
        public DateTime LastExecutedAt {get;set;}
        [BsonElement("status")]
        public string Status{get;set;}

        public NotificationTask()
        {
            CreatedAt = DateTime.Now;
            UpdatedAt = DateTime.Now;
            Status = RepositoryNotifier.Constants.Status.INIT;
        }

        public NotificationTask(string p_username, string p_email, IList<string> p_repositories, Frequency p_frequency, IList<string> p_searchKeywords)
        {
            Username = p_username;
            Email = p_email;
            Repositories = p_repositories;
            Frequency = p_frequency;
            SearchKeywords = p_searchKeywords;
            CreatedAt = DateTime.Now;
            UpdatedAt = DateTime.Now;
            Status = RepositoryNotifier.Constants.Status.INIT;
        }
    }
}