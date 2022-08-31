﻿using bloglist_fullstack.Models;
using bloglist_fullstack.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace bloglist_fullstack.Controllers
{
    [Route("api/blogs")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private BlogService _blogService;

        public BlogController(BlogService blogService)
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
