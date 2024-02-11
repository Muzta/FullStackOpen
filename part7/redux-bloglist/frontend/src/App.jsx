import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import NavigationMenu from "./components/NavigationMenu";
import Notification from "./components/Notification";
import UsersViewAll from "./components/UsersViewAll";
import UsersViewSingle from "./components/UsersViewSingle";
import { initializeBloglist } from "./reducers/blogReducer";
import { fetchLoggedUser } from "./reducers/userReducer";
import { initializeUsersDictionary } from "./reducers/usersViewReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBloglist());
    dispatch(fetchLoggedUser());
    dispatch(initializeUsersDictionary());
  }, [dispatch]);

  const user = useSelector((state) => state.user);

  return (
    <div>
      <Notification />
      <h2>Blogs</h2>
      {user ? (
        <div>
          <NavigationMenu />

          <Routes>
            <Route path="/users/:id" element={<UsersViewSingle />} />
            <Route path="/blogs/:id" element={<Blog />} />
            <Route path="/users" element={<UsersViewAll />} />
            <Route
              path="/blogs"
              element={
                <>
                  <BlogForm />
                  <BlogList />
                </>
              }
            />
            <Route path="" element={<></>} />
          </Routes>
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default App;
