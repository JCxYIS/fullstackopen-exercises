using bloglist_backend_cs.Models;
using MongoDB.Bson;

namespace bloglist_backend_cs.Services
{
    public interface IBlogService
    {
        Task CreateAsync(Blog blog);
        Task DeleteAsync(string id);
        Task<Blog> GetBlogAsync(string id);
        Task<List<Blog>> GetBlogsAsync();
        Task UpdateAsync(string id, Blog newData);
    }
}