using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace bloglist_backend_cs.Models
{
    public class Blog
    {
        //[BsonId]
        //[JsonIgnore]
        //public ObjectId id { get; set; }

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; } = "";

        public string title { get; set; } = "";
        public string author { get; set; } = "";
        public string url { get; set; } = "";
        public int likes { get; set; } = 0;
    }
}
