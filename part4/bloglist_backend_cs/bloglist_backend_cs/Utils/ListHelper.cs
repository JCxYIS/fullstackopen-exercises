using bloglist_backend_cs.Models;

namespace bloglist_backend_cs.Utils
{
    public class ListHelper
    {
        public static int Dummy(Blog[] blogs)
        {
            return 1;
        }

        public static int TotalLike(Blog[] blogs)
        {
            int total = 0;
            foreach (var blog in blogs)
            {
                total += blog.likes;
            }
            return total;
        }

        public static Blog? FavoriteBlog(Blog[] blogs)
        {
            int max = 0;
            Blog? maxBlog = null;
            foreach (var blog in blogs)
            {
                if (blog.likes > max)
                {
                    max = blog.likes;
                    maxBlog = blog;
                }
            }
            return maxBlog;
        }

        public class MostBlogAuthorResult
        {
            public string author;
            public int blogs;
        }
        
        public static MostBlogAuthorResult MostBlogAuthor(Blog[] blogs)
        {
            Dictionary<string, List<Blog>> authorBlog = new Dictionary<string, List<Blog>>();
            foreach (var blog in blogs)
            {
                if (authorBlog.ContainsKey(blog.author))
                {
                    authorBlog[blog.author].Add(blog);
                }
                else
                {
                    authorBlog.Add(blog.author, new List<Blog>() { blog });
                }
            }
            int max = 0;
            string maxAuthor = "";
            foreach (var author in authorBlog)
            {
                if (author.Value.Count > max)
                {
                    max = author.Value.Count;
                    maxAuthor = author.Key;
                }
            }
            return new MostBlogAuthorResult
            {
                blogs = max,
                author = maxAuthor
            };
        }

        public class MostLikeAuthorResult
        {
            public string author;
            public int likes;
        }

        public static MostLikeAuthorResult MostLikeAuthor(Blog[] blogs)
        {
            Dictionary<string, int> authorBlog = new Dictionary<string, int>();
            foreach (var blog in blogs)
            {
                if (authorBlog.ContainsKey(blog.author))
                {
                    authorBlog[blog.author] += blog.likes;
                }
                else
                {
                    authorBlog.Add(blog.author, blog.likes);
                }
            }
            int max = 0;
            string maxAuthor = "";
            foreach (var author in authorBlog)
            {
                if (author.Value > max)
                {
                    max = author.Value;
                    maxAuthor = author.Key;
                }
            }
            return new MostLikeAuthorResult
            {
                likes = max,
                author = maxAuthor
            };
        }
    }
}
