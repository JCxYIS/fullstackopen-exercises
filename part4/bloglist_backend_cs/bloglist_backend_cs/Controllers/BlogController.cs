using Microsoft.AspNetCore.Mvc;
using bloglist_backend_cs.Services;
using bloglist_backend_cs.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace bloglist_backend_cs.Controllers
{
    [Route("api/blogs")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private IBlogService _blogService;

        public BlogController(IBlogService blogService)
        {
            _blogService = blogService;
        }

        // GET: api/<BlogController>
        [HttpGet]
        public async Task<List<Blog>> GetAsync()
        {
            return await _blogService.GetBlogsAsync();
        }

        // POST api/<BlogController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Blog newPost)
        {
            await _blogService.CreateAsync(newPost);
            return StatusCode(201);
        }

    }
}
