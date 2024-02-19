import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBlog, likeBlog } from "../reducers/blogReducer.js";
import { createNotification } from "../reducers/notificationReducer.js";
import Comments from "./Comments.jsx";

const Blog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        navigate("/blogs");
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
      <h2 className="font-bold text-2xl">
        {blog.title} <i className="italic">{blog.author}</i>
      </h2>
      <div className="blog-content">
        <a
          href={blog.url}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          {blog.url}
        </a>
        <br></br>
        {blog.likes} Likes{" "}
        <button
          className="like-button text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 my-1.5 text-center"
          onClick={() => handleLike(blog)}
        >
          Like
        </button>
        <br></br>
        Added by {blog.user.name}
        <br></br>
        {loggedUsername === blog.user.username ? (
          <button
            className="remove-button focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-1.5 my-1.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={() => handleRemove(blog)}
          >
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
