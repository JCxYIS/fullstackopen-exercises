using bloglist_fullstack.Models;
using bloglist_fullstack.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace bloglist_fullstack.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BlogsController : ControllerBase
    {
        private BlogService _blogService;

        public BlogsController(BlogService blogService)
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
            if (User.Identity?.Name == null)
                throw new ArgumentNullException();
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
            if (targetBlog.author == User.Identity?.Name)
            {
                await _blogService.DeleteAsync(id);
                return Ok();
            }
            return Forbid();
        }

        [HttpPost("{id}/like")]
        public async Task<IActionResult> Like(string id)
        {
            var blog = await _blogService.GetBlogAsync(id);
            blog.likes += 1;
            await _blogService.UpdateAsync(blog.id, blog);
            return Ok();
        }

        [HttpGet("leaderboard")]
        public async Task<IActionResult> Leaderboard()
        {
            return Ok(await _blogService.GetLeaderboard());
        }
    }
}
