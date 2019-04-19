using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace RepositoryNotifier.Persistence
{
    public class Donation
    {
        [BsonId]
        public ObjectId Id { get; set; }

        [BsonElement("username")]
        public string Username { get; set; }

        [BsonElement("amount")]
        public double Amount { get; set; }
        [BsonElement("payment_type")]
        public string PaymentType { get; set; }

        [BsonElement("created_at")]
        public DateTime CreatedAt { get; set; }


    }

}