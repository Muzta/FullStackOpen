import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({});

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
    const localUserJSON = window.localStorage.getItem("loggedUser");
    if (localUserJSON) setUser(JSON.parse(localUserJSON));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setNotification({ message: "Wrong credentials", error: true });
      setTimeout(() => setNotification({}), 5000);
    }
  };

  const handleLogout = async () => {
    window.localStorage.clear();
    setUser(null);
  };

  return (
    <div>
      <h2>Blogs</h2>
      {user ? (
        <div>
          <p>{user.username} logged in</p>
          <div>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
          <button onClick={handleLogout}>Log out</button>
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
