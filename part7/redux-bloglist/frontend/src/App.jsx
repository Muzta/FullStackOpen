import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import UsersView from "./components/UsersView";
import { initializeBloglist } from "./reducers/blogReducer";
import { fetchLoggedUser, logout } from "./reducers/userReducer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBloglist());
    dispatch(fetchLoggedUser());
  }, [dispatch]);

  const user = useSelector((state) => state.user);

  return (
    <Router>
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

            <Routes>
              <Route path="/users" element={<UsersView />} />
              <Route
                path="/"
                element={
                  <>
                    <BlogForm />
                    <BlogList />
                  </>
                }
              />
            </Routes>
          </div>
        ) : (
          <LoginForm />
        )}
      </div>
    </Router>
  );
};

export default App;
