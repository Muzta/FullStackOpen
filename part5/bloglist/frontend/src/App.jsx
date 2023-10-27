import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blog, setBlog] = useState(null);
  const [notification, setNotification] = useState({});

  const resetBlogState = () => {
    setBlog({
      title: "",
      author: "",
      url: "",
    });
  };

  const createNotification = ({ message, error = false }) => {
    setNotification({ message, error });
    setTimeout(() => {
      setNotification({});
    }, 5000);
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
    resetBlogState();
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

  const addBlog = async (event) => {
    event.preventDefault();

    try {
      const newBlog = await blogService.addBlog(blog);
      setBlogs(blogs.concat(newBlog));
      resetBlogState();
      createNotification({ message: `A new blog was added` });
    } catch (error) {
      createNotification({ message: error.response.data.error, error: true });
    }
  };

  const handleBlogChanges = (event) => {
    const { name, value } = event.target;
    setBlog({
      ...blog,
      [name]: value,
    });
  };

  const handleLogout = async () => {
    window.localStorage.clear();
    setUser(null);
  };

  return (
    <div>
      <Notification notification={notification} />
      <h2>Blogs</h2>
      {user ? (
        <div>
          <p>
            {user.username} logged in{" "}
            <button onClick={handleLogout}>Log out</button>
          </p>

          <BlogForm
            handleSubmit={addBlog}
            blog={blog}
            handleChanges={handleBlogChanges}
          />

          <div>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
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
