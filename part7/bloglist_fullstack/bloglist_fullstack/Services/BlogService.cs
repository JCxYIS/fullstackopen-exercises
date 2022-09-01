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
    }
}
