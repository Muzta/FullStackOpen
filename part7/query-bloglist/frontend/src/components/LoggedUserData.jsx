import { useContext } from "react";
import LoggedUserContext from "../contexts/LoggedUserContext";

const LoginData = () => {
  const [loggedUser, loggedUserDispatch] = useContext(LoggedUserContext);

  const handleLogout = () => {
    loggedUserDispatch({ type: "LOGOUT" });
    window.localStorage.clear();
  };

  return (
    <p>
      {loggedUser.username} logged in{" "}
      <button id="logout" onClick={handleLogout}>
        Log out
      </button>
    </p>
  );
};

export default LoginData;
