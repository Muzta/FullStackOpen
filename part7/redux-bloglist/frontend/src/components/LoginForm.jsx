import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/userReducer";

const LoginForm = () => {
  const dispatch = useDispatch();

  const initialCredentials = {
    username: "",
    password: "",
  };

  const [credentials, setCredentials] = useState(initialCredentials);

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(login(credentials));
    setCredentials(initialCredentials);
  };

  const handleUserChanges = (event) => {
    const { name, value } = event.target;
    setCredentials({
      ...credentials,
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
          value={credentials.username}
          name="username"
          onChange={handleUserChanges}
          required
        ></input>
      </div>

      <div>
        Password
        <input
          type="password"
          id="password"
          value={credentials.password}
          name="password"
          onChange={handleUserChanges}
          required
        ></input>
      </div>

      <button id="login-button" type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
