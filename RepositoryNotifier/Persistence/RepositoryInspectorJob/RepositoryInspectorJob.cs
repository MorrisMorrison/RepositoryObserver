using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace RepositoryNotifier.Persistence.RepositoryInspectorJob
{
    public class RepositoryInspectorJob
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
        public RepositoryInspectorJobFrequency Frequency { get; set; }

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
    }
}