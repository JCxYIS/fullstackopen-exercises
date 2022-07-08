using Microsoft.Extensions.Options;
using MongoDB.Driver;
using phonebook_backend_cs.Models;

namespace phonebook_backend_cs.Services
{
    public class PhonebookService
    {
        private readonly IMongoCollection<PhonebookEntry> _entryCollection;

        public PhonebookService()
        {
            var password = Environment.GetEnvironmentVariable("MONGO_PSW");
            if(password == null)
            {
                throw new Exception("Please specify MONGO_PSW");
            }
            
            var settings = MongoClientSettings.FromConnectionString($"mongodb+srv://hahatest123:{password}@fullstack-exercise-phon.iaigvqb.mongodb.net/?retryWrites=true&w=majority");
            settings.ServerApi = new ServerApi(ServerApiVersion.V1);
            var client = new MongoClient(settings);
            var database = client.GetDatabase("test");

            _entryCollection = database.GetCollection<PhonebookEntry>("PhonebookEntry");
        }

        public async Task<List<PhonebookEntry>> GetAsync() =>
            await _entryCollection.Find(_ => true).ToListAsync();

        public async Task<PhonebookEntry?> GetAsync(string id) =>
            await _entryCollection.Find(x => x.id == id).FirstOrDefaultAsync();
        public async Task<PhonebookEntry?> GetWithNameAsync(string name) =>
            await _entryCollection.Find(x => x.name == name).FirstOrDefaultAsync();

        public async Task CreateAsync(PhonebookEntry newEntry) =>
            await _entryCollection.InsertOneAsync(newEntry);

        public async Task UpdateAsync(string id, PhonebookEntry updatedEntry) =>
            await _entryCollection.ReplaceOneAsync(x => x.id == id, updatedEntry);

        public async Task RemoveAsync(string id) =>
            await _entryCollection.DeleteOneAsync(x => x.id == id);
    }
}
