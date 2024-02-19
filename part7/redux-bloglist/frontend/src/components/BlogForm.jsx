import { useState, useRef } from "react";
import Togglable from "./Togglable";
import { useDispatch } from "react-redux";
import { addNewBlog } from "../reducers/blogReducer";
import { createNotification } from "../reducers/notificationReducer";

const BlogForm = () => {
  const blogFormRef = useRef();
  const dispatch = useDispatch();

  const blogInitialState = {
    title: "",
    author: "",
    url: "",
  };

  const [newBlog, setNewBlog] = useState(blogInitialState);

  const createBlog = (event) => {
    try {
      event.preventDefault();
      dispatch(addNewBlog(newBlog));
      blogFormRef.current.toggleVisibility();
      dispatch(
        createNotification({
          message: `New blog "${newBlog.title}" was added`,
        })
      );
      setNewBlog(blogInitialState);
    } catch (error) {
      dispatch(
        createNotification({ message: error.response.data.error, error: true })
      );
    }
  };

  const handleBlogChanges = (event) => {
    const { name, value } = event.target;
    setNewBlog({
      ...newBlog,
      [name]: value,
    });
  };

  return (
    <Togglable buttonLabel="New blog" hideLabel="Cancel" ref={blogFormRef}>
      <div>
        <form id="blog-form" onSubmit={createBlog}>
          <div>
            Title:
            <input
              className="m-1"
              type="text"
              value={newBlog.title}
              name="title"
              id="title"
              onChange={handleBlogChanges}
              required
            ></input>
          </div>

          <div>
            Author:
            <input
              className="m-1"
              type="text"
              value={newBlog.author}
              name="author"
              id="author"
              onChange={handleBlogChanges}
            ></input>
          </div>

          <div>
            Url:
            <input
              className="m-1"
              type="url"
              value={newBlog.url}
              name="url"
              id="url"
              onChange={handleBlogChanges}
              required
            ></input>
          </div>

          <button
            className="like-button text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 my-1.5 text-center"
            id="create"
            type="submit"
          >
            Create
          </button>
        </form>
      </div>
    </Togglable>
  );
};

export default BlogForm;
