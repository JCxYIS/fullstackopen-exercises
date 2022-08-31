using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace bloglist_fullstack.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; } = "";

        public string username { get; set; } = "";

        [JsonIgnore]
        public string passwordHash { get; set; } = "";

        [JsonIgnore]
        public string passwordSalt { get; set; } = "";

        // ------------------------------

        public string name { get; set; } = "";
    }
}
