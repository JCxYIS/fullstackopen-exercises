using bloglist_backend_cs.Models;
using bloglist_backend_cs.Utils;

namespace bloglist_backend_cs.Tests
{
    public class Tests
    {
        [SetUp]
        public void Setup()
        {
        }


        [Test]
        public void ListHelperTest()
        {
            Assert.IsTrue(ListHelper.Dummy(new Blog[] { }) == 1);
        }

        [Test, Description("when list has only one blog, equals the likes of that")]
        public void TotalLikeTest()
        {
            var listWithOneBlog = new Blog[]
            {
                new Blog
                {
                    //_id: "5a422aa71b54a676234d17f8",
                    title= "Go To Statement Considered Harmful",
                    author= "Edsger W. Dijkstra",
                    url= "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
                    likes= 5,
                    //__v: 0
                }
            };
            Assert.IsTrue(ListHelper.TotalLike(listWithOneBlog) == 5);
        }

        [Test, Description("finds out which blog has most likes")]
        public void FavoriteBlogTest()
        {
            var blogs = new Blog[]
            {
                new Blog
                {
                    //_id: "5a422aa71b54a676234d17f8",
                    title= "Go To Statement Considered Harmful",
                    author= "Edsger W. Dijkstra",
                    url= "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
                    likes= 5,
                    //__v: 0
                },
                new Blog
                {
                     title= "Canonical string reduction",
                        author= "Edsger W. Dijkstra",
                    likes= 12
                }

            };
            Assert.IsTrue(ListHelper.FavoriteBlog(blogs) == blogs[1]);
        }
    }
}