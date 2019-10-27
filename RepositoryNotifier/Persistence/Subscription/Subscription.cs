using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace RepositoryNotifier.Persistence.Subscription
{
    public class Subscription
    {

        [BsonId]
        public ObjectId Id { get; set; }

        [BsonElement("username")]
        public string Username { get; set; }

        [BsonElement("premium_plans")]
        public PremiumPlan PremiumPlan {get;set;}

        [BsonElement("billing_address")]
        public BillingAddress BillingAddress {get;set;}

        [BsonElement("active")]
        public bool Active {get;set;}


    }
}