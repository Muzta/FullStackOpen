import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({});
  const blogFormRef = useRef();

  const createNotification = ({ message, error = false }) => {
    setNotification({ message, error });
    setTimeout(() => {
      setNotification({});
    }, 5000);
  };

  const sortBloglist = (bloglist) =>
    bloglist.sort((b1, b2) => b2.likes - b1.likes);

  useEffect(() => {
    blogService.getAll().then((returnedBloglist) => {
      sortBloglist(returnedBloglist);
      setBlogs(returnedBloglist);
    });
  }, []);

  useEffect(() => {
    const localUserJSON = window.localStorage.getItem("loggedUser");
    if (localUserJSON) {
      const localUser = JSON.parse(localUserJSON);
      setUser(localUser);
      blogService.setToken(localUser.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
    } catch (error) {
      createNotification({ message: error.response.data.error, error: true });
    }
  };

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();
      const returnedBlog = await blogService.addBlog(blogObject);
      setBlogs(blogs.concat(returnedBlog));
      createNotification({ message: "A new blog was added" });
    } catch (error) {
      createNotification({ message: error.response.data.error, error: true });
    }
  };

  const likeBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.likeBlog(blogObject);
      const newBloglist = blogs.map((blog) =>
        blog.id === returnedBlog.id ? returnedBlog : blog
      );
      sortBloglist(newBloglist);
      setBlogs(newBloglist);
    } catch (error) {
      createNotification({ message: error.response.data.error, error: true });
    }
  };

  const deleteBlog = async (blogObject) => {
    if (
      window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)
    ) {
      try {
        await blogService.deleteBlog(blogObject);
        setBlogs(blogs.filter((blog) => blog.id !== blogObject.id));
        createNotification({ message: `Blog ${blogObject.title} was removed` });
      } catch (error) {
        createNotification({ message: error.response.data.error, error: true });
      }
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
    blogService.setToken(null);
  };

  return (
    <div>
      <Notification notification={notification} />
      <h2>Blogs</h2>
      {user ? (
        <div>
          <p>
            {user.username} logged in{" "}
            <button id="logout" onClick={handleLogout}>
              Log out
            </button>
          </p>

          <Togglable
            buttonLabel="New blog"
            hideLabel="Cancel"
            ref={blogFormRef}
          >
            <BlogForm createBlog={addBlog} />
          </Togglable>

          <div id="blog-list">
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleLike={() => likeBlog(blog)}
                handleRemove={() => deleteBlog(blog)}
                loggedUsername={user.username}
              />
            ))}
          </div>
        </div>
      ) : (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={(event) => {
            setUsername(event.target.value);
          }}
          handlePasswordChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      )}
    </div>
  );
};

export default App;
