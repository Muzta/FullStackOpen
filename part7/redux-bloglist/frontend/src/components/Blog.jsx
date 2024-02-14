import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteBlog, likeBlog } from "../reducers/blogReducer.js";
import { createNotification } from "../reducers/notificationReducer.js";
import Comments from "./Comments.jsx";

const Blog = () => {
  const dispatch = useDispatch();
  const loggedUsername = useSelector((state) => state.user.username);
  const blogs = useSelector((state) => state.blogs);

  const blogId = useParams().id;
  const blog = blogs.find((b) => b.id === blogId);

  const handleLike = (blogObject) => {
    try {
      dispatch(likeBlog(blogObject));
    } catch (error) {
      dispatch(
        createNotification({ message: error.response.data.error, error: true })
      );
    }
  };

  const handleRemove = (blogObject) => {
    if (
      window.confirm(
        `Remove blog "${blogObject.title}" by ${blogObject.author}`
      )
    ) {
      try {
        dispatch(deleteBlog(blogObject));
        dispatch(
          createNotification({
            message: `Blog "${blogObject.title}" was removed`,
          })
        );
      } catch (error) {
        dispatch(
          createNotification({
            message: error.response.data.error,
            error: true,
          })
        );
      }
    }
  };

  if (!blog) return null;

  return (
    <div className="blog-data">
      <h2>
        {blog.title} <i>{blog.author}</i>
      </h2>
      <div className="blog-content">
        {blog.url}
        <br></br>
        {blog.likes} Likes{" "}
        <button className="like-button" onClick={() => handleLike(blog)}>
          Like
        </button>
        <br></br>
        Added by {blog.user.name}
        <br></br>
        {loggedUsername === blog.user.username ? (
          <button className="remove-button" onClick={() => handleRemove(blog)}>
            Remove
          </button>
        ) : null}
        <Comments blog={blog} />
      </div>
    </div>
  );
  // }
};

export default Blog;
