import { useDispatch, useSelector } from "react-redux";
import Togglable from "./Togglable.jsx";
import { likeBlog, deleteBlog } from "../reducers/blogReducer.js";
import { createNotification } from "../reducers/notificationReducer.js";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const loggedUsername = useSelector((state) => state.user.username);

  const incrementLikes = async (blogObject) => {
    try {
      dispatch(likeBlog(blogObject));
    } catch (error) {
      dispatch(
        createNotification({ message: error.response.data.error, error: true })
      );
    }
  };

  const removeBlog = async (blogObject) => {
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
        <div className="blog-content">
          {blog.url}
          <br></br>
          Likes {blog.likes}{" "}
          <button className="like-button" onClick={() => incrementLikes(blog)}>
            Like
          </button>
          <br></br>
          {blog.user.name}
          <br></br>
          {loggedUsername === blog.user.username ? (
            <button className="remove-button" onClick={() => removeBlog(blog)}>
              Remove
            </button>
          ) : null}
        </div>
      </Togglable>
    </div>
  );
};

export default Blog;
