import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import { useQuery } from "@tanstack/react-query";
import { useCreateNotification } from "./contexts/NotificationContext.jsx";
import { getBlogs, setToken } from "./requests";
import {
  useLoggedUserDispatch,
  useLoggedUserValue,
} from "./contexts/LoggedUserContext.jsx";

const App = () => {
  const createNotification = useCreateNotification();
  const loggedUserDispatch = useLoggedUserDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loggedUser = useLoggedUserValue();
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
      loggedUserDispatch({ type: "SET_USER", payload: localUser });
      setToken(localUser.token);
      loggedUserDispatch({ type: "SET_TOKEN", payload: localUser.token });
    }
  }, [loggedUserDispatch]);

  if (getBlogsResult.isLoading) return <div>Loading data...</div>;

  const blogs = sortBloglist(getBlogsResult.data);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      loggedUserDispatch({ type: "SET_USER", payload: user });
      setToken(user.token);
      setUsername("");
      setPassword("");
    } catch (error) {
      createNotification({ message: error.response.data.error, error: true });
    }
  };

  const handleLogout = () => {
    loggedUserDispatch({ type: "LOGOUT" });
    window.localStorage.clear();
  };

  return (
    <div>
      <Notification />
      <h2>Blogs</h2>
      {loggedUser ? (
        <div>
          <p>
            {loggedUser.username} logged in{" "}
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
              <Blog
                key={blog.id}
                blog={blog}
                loggedUsername={loggedUser.username}
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
