import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  if (!blogs) return null;

  return (
    <div id="blog-list">
      {blogs.map((blog) => {
        return (
          <div
            className="blog-list-item py-2 px-1 my-1 border-2 border-solid border-gray-800"
            key={blog.id}
          >
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} <i>{blog.author}</i>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default BlogList;
