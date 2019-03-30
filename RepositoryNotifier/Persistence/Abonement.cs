using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace RepositoryNotifier.Persistence
{
    public class Abonement
    {

        [BsonId]
        public ObjectId Id { get; set; }

        [BsonElement("username")]
        public string Username { get; set; }

        [BsonElement("premium_plans")]
        public PremiumPlan PremiumPlan {get;set;}

    }
}