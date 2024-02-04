import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { useLoggedUserValue } from "../contexts/LoggedUserContextUtils";
import { getBlogs } from "../requests";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";

const BlogList = () => {
  const loggedUser = useLoggedUserValue();
  const blogFormRef = useRef();

  const getBlogsResult = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
    refetchOnWindowFocus: false,
  });

  if (getBlogsResult.isLoading) return <div>Loading data...</div>;

  const sortBloglist = (bloglist) =>
    bloglist.sort((b1, b2) => b2.likes - b1.likes);

  const blogs = sortBloglist(getBlogsResult.data);

  return (
    <div id="blog-list">
      <Togglable buttonLabel="New blog" hideLabel="Cancel" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>

      <div id="blog-list">
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            loggedUsername={loggedUser.username}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
