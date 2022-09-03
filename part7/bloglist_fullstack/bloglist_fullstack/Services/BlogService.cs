using bloglist_fullstack.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace bloglist_fullstack.Services
{
    public class BlogService 
    {
        IMongoCollection<Blog> _blogs;

        public BlogService(DatabaseService databaseService, ILogger<BlogService> logger)
        {
            _blogs = databaseService.Database.GetCollection<Blog>("BlogList");
        }

        public async Task<List<Blog>> GetBlogsAsync()
        {
            return (await _blogs.FindAsync(blog => true)).ToList();
        }

        public async Task<Blog> GetBlogAsync(string id)
        {
            return (await _blogs.FindAsync(blog => blog.id == id)).FirstOrDefault();
        }

        public async Task CreateAsync(Blog blog)
        {
            await _blogs.InsertOneAsync(blog);
        }

        public async Task UpdateAsync(string id, Blog newData)
        {
            await _blogs.ReplaceOneAsync(blog => blog.id == id, newData);
        }

        public async Task DeleteAsync(string id)
        {
            await _blogs.DeleteOneAsync(blog => blog.id == id);
        }

        // should be cached since this do a lot of work
        public async Task<List<KeyValuePair<string, int>>> GetLeaderboard()
        {
            var blogs = await GetBlogsAsync();

            // store to dict
            Dictionary<string, int> blogsDict = new Dictionary<string, int>();
            foreach(var blog in blogs)
            {
                blogsDict[blog.author] = blogsDict.TryGetValue(blog.author, out int value) ? value+1 : 1;
            }
            return blogsDict.OrderByDescending(b => b.Value).ToList();
        }
    }
}
