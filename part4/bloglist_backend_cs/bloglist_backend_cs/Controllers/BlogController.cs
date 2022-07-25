using Microsoft.AspNetCore.Mvc;
using bloglist_backend_cs.Services;
using bloglist_backend_cs.Models;
using MongoDB.Bson;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

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
        [Authorize]
        public async Task<IActionResult> Post([FromBody] Blog newPost)
        {
            newPost.id = "";
            newPost.author = User.Identity.Name;
            await _blogService.CreateAsync(newPost);
            return StatusCode(201);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] Blog newData)
        {
            await _blogService.UpdateAsync(id, newData);
            return Ok();
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(string id)
        {
            var targetBlog = await _blogService.GetBlogAsync(id);
            if (targetBlog.author == User.Identity.Name)
            {
                await _blogService.DeleteAsync(id);
                return Ok();                
            }
            return Forbid();
        }

    }
}
