import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import { useDispatch, useSelector } from "react-redux";
import { initializeBloglist } from "./reducers/blogReducer";
import { fetchLoggedUser, login, logout } from "./reducers/userReducer";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBloglist());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchLoggedUser());
  }, [dispatch]);

  const notification = useSelector((state) => state.notification);
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const handleLogin = (event) => {
    event.preventDefault();

    dispatch(login({ username, password }));
    setUsername("");
    setPassword("");
  };

  const handleLogout = () => {
    dispatch(logout());
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

          <BlogForm />

          <div id="blog-list">
            {blogs.map((blog) => {
              return <Blog key={blog.id} blog={blog} />;
            })}
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
