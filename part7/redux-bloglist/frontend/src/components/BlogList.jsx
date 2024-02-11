import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  const lineStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  if (!blogs) return null;

  return (
    <div id="blog-list">
      {blogs.map((blog) => {
        return (
          <div className="blog-list-item" style={lineStyle} key={blog.id}>
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
