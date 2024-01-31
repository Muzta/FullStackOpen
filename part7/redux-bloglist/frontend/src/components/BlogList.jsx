import { useSelector } from "react-redux";
import Blog from "./Blog";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <div id="blog-list">
      {blogs.map((blog) => {
        return <Blog key={blog.id} blog={blog} />;
      })}
    </div>
  );
};

export default BlogList;
