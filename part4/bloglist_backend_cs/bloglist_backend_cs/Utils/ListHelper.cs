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

        public static Blog FavoriteBlog(Blog[] blogs)
        {
            int max = 0;
            Blog maxBlog = null;
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
    }
}
