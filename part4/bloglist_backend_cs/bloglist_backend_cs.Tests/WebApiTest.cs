using bloglist_backend_cs.Controllers;
using bloglist_backend_cs.Models;
using bloglist_backend_cs.Services;
using FakeItEasy;
using Microsoft.AspNetCore.Hosting;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace bloglist_backend_cs.Tests
{
    public class WebApiTest
    {
        private int _fakeDataCount = 25;
        private BlogController _controller;
        private Blog _dummyBlog = new Blog();

        [SetUp]
        public void Setup()
        {
            var fakeBlogs = A.CollectionOfDummy<Blog>(_fakeDataCount).ToList();
            var fakeBlogService = A.Fake<IBlogService>();
            A.CallTo(() => fakeBlogService.GetBlogsAsync()).Returns(Task.FromResult(fakeBlogs));
            A.CallTo(() => fakeBlogService.CreateAsync(_dummyBlog)).Invokes(()=>fakeBlogs.Add(_dummyBlog));
            _controller = new BlogController(fakeBlogService);
        }

        [Test, Description("Get Blogs")]
        public async Task GetBlogsTest()
        {
            var result = await _controller.GetAsync();
            Assert.IsTrue(result.Count() == _fakeDataCount);
        }

        [Test, Description("Create Blog")]
        public async Task PostBlogsTest()
        {
            Assert.IsTrue((await _controller.GetAsync()).Count == _fakeDataCount);
            await _controller.Post(_dummyBlog);
            Assert.IsTrue((await _controller.GetAsync()).Count == _fakeDataCount + 1);
        }
    }
}
