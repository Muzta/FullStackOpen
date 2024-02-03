import { useMutation, useQueryClient } from "@tanstack/react-query";
import Togglable from "./Togglable.jsx";
import { deleteBlog, likeBlog } from "../requests";
import { useCreateNotification } from "../NotificationContext.jsx";

const Blog = ({ blog, loggedUsername }) => {
  const queryClient = useQueryClient();
  const createNotification = useCreateNotification();

  const sortBloglist = (bloglist) =>
    bloglist.sort((b1, b2) => b2.likes - b1.likes);

  const deleteBlogMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      const blogs = queryClient.getQueryData(["blogs"]);
      createNotification({ message: `Blog ${blog.title} was removed` });
      queryClient.setQueryData(
        ["blogs"],
        blogs.filter((b) => b.id !== blog.id)
      );
    },
    onError: (error) => {
      createNotification({ message: error.response.data.error, error: true });
    },
  });

  const likeBlogMutation = useMutation({
    mutationFn: likeBlog,
    onSuccess: (likedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        sortBloglist(blogs.map((b) => (b.id === likedBlog.id ? likedBlog : b)))
      );
    },
    onError: (error) => {
      createNotification({ message: error.response.data.error, error: true });
    },
  });

  const onDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
      deleteBlogMutation.mutate(blog);
  };

  const onLike = () => {
    likeBlogMutation.mutate(blog);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div className="blog-data" style={blogStyle}>
      {blog.title} <i>{blog.author}</i>
      <Togglable buttonLabel="View" hideLabel="Hide">
        <div id="blog-content">
          {blog.url}
          <br></br>
          Likes {blog.likes}{" "}
          <button id="like-button" onClick={onLike}>
            Like
          </button>
          <br></br>
          {blog.user.name}
          <br></br>
          {loggedUsername === blog.user.username ? (
            <button id="remove-button" onClick={onDelete}>
              Remove
            </button>
          ) : null}
        </div>
      </Togglable>
    </div>
  );
};

export default Blog;
