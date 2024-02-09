import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import UsersViewAll from "./components/UsersViewAll";
import { initializeBloglist } from "./reducers/blogReducer";
import { fetchLoggedUser, logout } from "./reducers/userReducer";
import UsersViewSingle from "./components/UsersViewSingle";

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
              <Route path="/users/:id" element={<UsersViewSingle />} />
              <Route path="/users" element={<UsersViewAll />} />
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
