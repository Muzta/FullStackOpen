import { useEffect } from "react";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import { useDispatch, useSelector } from "react-redux";
import { initializeBloglist } from "./reducers/blogReducer";
import { fetchLoggedUser, logout } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBloglist());
    dispatch(fetchLoggedUser());
  }, [dispatch]);

  const user = useSelector((state) => state.user);

  return (
    <div>
      <Notification />
      <h2>Blogs</h2>
      {user ? (
        <div>
          <p>
            {user.username} logged in{" "}
            <button id="logout" onClick={() => dispatch(logout())}>
              Log out
            </button>
          </p>

          <BlogForm />
          <BlogList />
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default App;
