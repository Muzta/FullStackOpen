import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import { useQuery } from "@tanstack/react-query";
import { useCreateNotification } from "./NotificationContext";
import { getBlogs, setToken } from "./requests";

const App = () => {
  const createNotification = useCreateNotification();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();

  const getBlogsResult = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
    refetchOnWindowFocus: false,
  });

  const sortBloglist = (bloglist) =>
    bloglist.sort((b1, b2) => b2.likes - b1.likes);

  useEffect(() => {
    const localUserJSON = window.localStorage.getItem("loggedUser");
    if (localUserJSON) {
      const localUser = JSON.parse(localUserJSON);
      setUser(localUser);
      setToken(localUser.token);
    }
  }, []);

  if (getBlogsResult.isLoading) return <div>Loading data...</div>;

  const blogs = sortBloglist(getBlogsResult.data);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setUser(user);
      setToken(user.token);
      setUsername("");
      setPassword("");
    } catch (error) {
      createNotification({ message: error.response.data.error, error: true });
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
    setToken(null);
  };

  return (
    <div>
      <Notification />
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
            <BlogForm blogFormRef={blogFormRef} />
          </Togglable>

          <div id="blog-list">
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} loggedUsername={user.username} />
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
