using bloglist_backend_cs.Models;

namespace bloglist_backend_cs.Services
{
    public interface IBlogService
    {
        Task CreateAsync(Blog blog);
        Task<List<Blog>> GetBlogsAsync();
    }
}