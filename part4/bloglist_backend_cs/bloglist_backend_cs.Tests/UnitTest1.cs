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

        [Test, Description("the author who has the largest amount of blogs. The return value also contains the number of blogs the top author has")]
        public void MostBlogTest()
        {
            var blogs = new List<Blog>();            
            int maxBlog = 0;
            string maxAuthor = "";
            
            // define some dummy authors
            for(int i = 0; i < 10; i++)
            {
                string author = "author" + i;
                int blogCount = new Random().Next(30);
                for(int j = 0; j < blogCount; j++)
                {
                    blogs.Add(new Blog
                    {
                        author = author,
                    });
                }
                if (blogCount > maxBlog)
                {
                    maxBlog = blogCount;
                    maxAuthor = author;
                }
            }

            // execute
            dynamic result = ListHelper.MostBlogAuthor(blogs.ToArray());
            Assert.IsTrue(result.blogs == maxBlog);
            Assert.IsTrue(result.author == maxAuthor);
        }

        [Test, Description(" The function returns the author, whose blog posts have the largest amount of likes. The return value also contains the total number of likes that the author has received")]
        public void MostLikeTest()
        {
            var blogs = new List<Blog>();
            int maxLike = 0;
            string maxAuthor = "";

            // define some dummy authors
            for (int i = 0; i < 10; i++)
            {
                string author = "author" + i;
                int blogCount = new Random().Next(30);
                int likeCount = 0;
                for (int j = 0; j < blogCount; j++)
                {
                    int thisLikeCount = new Random().Next(10000);
                    blogs.Add(new Blog
                    {
                        author = author,
                        likes = thisLikeCount,
                    });
                    likeCount += thisLikeCount;
                }
                if (likeCount > maxLike)
                {
                    maxLike = likeCount;
                    maxAuthor = author;
                }
            }

            // execute
            var result = ListHelper.MostLikeAuthor(blogs.ToArray());
            Assert.IsTrue(result.likes == maxLike);
            Assert.IsTrue(result.author == maxAuthor);
        }        
    }
}