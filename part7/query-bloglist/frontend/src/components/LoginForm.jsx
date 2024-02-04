import { useState } from "react";
import { useLoggedUserDispatch } from "../contexts/LoggedUserContextUtils";
import { useCreateNotification } from "../contexts/NotificationContextUtils";
import { setToken } from "../requests";
import loginService from "../services/login";

const LoginForm = () => {
  const userStructure = { username: "", password: "" };
  const [loginUser, setLoginUser] = useState(userStructure);
  const loggedUserDispatch = useLoggedUserDispatch();
  const createNotification = useCreateNotification();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login(loginUser);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      loggedUserDispatch({ type: "SET_USER", payload: user });
      setToken(user.token);
      setLoginUser(userStructure);
    } catch (error) {
      createNotification({ message: error.response.data.error, error: true });
    }
  };

  const handleLoginUserChanges = (event) => {
    const { name, value } = event.target;
    setLoginUser({
      ...loginUser,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input
          type="text"
          id="username"
          value={loginUser.username}
          name="username"
          onChange={handleLoginUserChanges}
        ></input>
      </div>

      <div>
        Password
        <input
          type="password"
          id="password"
          value={loginUser.password}
          name="password"
          onChange={handleLoginUserChanges}
        ></input>
      </div>

      <button id="login-button" type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
