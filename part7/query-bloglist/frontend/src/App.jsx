import { useContext, useEffect } from "react";
import BlogList from "./components/BlogList.jsx";
import LoggedUserData from "./components/LoggedUserData.jsx";
import LoginForm from "./components/LoginForm.jsx";
import Notification from "./components/Notification";
import LoggedUserContext from "./contexts/LoggedUserContext.jsx";
import { setToken } from "./requests";

const App = () => {
  const [loggedUser, loggedUserDispatch] = useContext(LoggedUserContext);

  useEffect(() => {
    const localUserJSON = window.localStorage.getItem("loggedUser");
    if (localUserJSON) {
      const localUser = JSON.parse(localUserJSON);
      loggedUserDispatch({ type: "SET_USER", payload: localUser });
      setToken(localUser.token);
    }
  }, [loggedUserDispatch]);

  return (
    <div>
      <Notification />
      <h2>Blogs</h2>
      {loggedUser ? (
        <div>
          <LoggedUserData />
          <BlogList />
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default App;
