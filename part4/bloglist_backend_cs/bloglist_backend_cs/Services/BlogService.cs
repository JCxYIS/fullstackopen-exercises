using bloglist_backend_cs.Models;
using MongoDB.Driver;

namespace bloglist_backend_cs.Services
{
    public class BlogService
    {
        IMongoCollection<Blog> _blogs;
        
        public BlogService()
        {
            var psw = Environment.GetEnvironmentVariable("MANGO_PSW");
            if (psw == null)
                throw new Exception("MANGO_PSW is null");
            var settings = MongoClientSettings.FromConnectionString($"mongodb+srv://hahatest123:{psw}@fullstack-exercise-phon.iaigvqb.mongodb.net/?retryWrites=true&w=majority");
            settings.ServerApi = new ServerApi(ServerApiVersion.V1);
            var client = new MongoClient(settings);
            var database = client.GetDatabase("test");

            _blogs = database.GetCollection<Blog>("BlogList");
        } 
        
        public async Task<List<Blog>> GetBlogsAsync()
        {
            return await _blogs.Find(blog => true).ToListAsync();
        }

        public async Task CreateAsync(Blog blog)
        {
            await _blogs.InsertOneAsync(blog);
        }
    }
}
