using MongoDB.Driver;

namespace bloglist_fullstack.Services
{
    public class DatabaseService
    {
        /// <summary>
        /// Mongo Client. Use `Client.GetDatabase()` to get your db
        /// </summary>
        public readonly IMongoClient Client;

        /// <summary>
        /// Default Mongo Database
        /// </summary>
        public readonly IMongoDatabase Database; // { get; private set; }

        public DatabaseService(IConfiguration configuration)
        {
            // Get connection info
            //var mongoUrl = configuration.GetValue<string>("MongoDB:Url");
            var mongoName = configuration.GetValue("MongoDB:Name", "main");
            var mongoUrl = Environment.GetEnvironmentVariable("MANGO_URL"); // we store it in settings.env file better keep it safe
            if (mongoUrl == null)
                throw new Exception("MANGO_URL is null");

            // Connect
            var settings = MongoClientSettings.FromConnectionString(mongoUrl);
            settings.ServerApi = new ServerApi(ServerApiVersion.V1);
            Client = new MongoClient(settings);

            // Test DB
            Database = Client.GetDatabase(mongoName);
            Console.WriteLine("Database Connected");
        }
    }
}
