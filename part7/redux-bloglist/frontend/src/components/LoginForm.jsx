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
    <form
      className="flex flex-col items-center justify-center"
      onSubmit={handleLogin}
    >
      <div className="flex flex-col items-center mb-4">
        Username
        <input
          className="m-1"
          type="text"
          id="username"
          value={credentials.username}
          name="username"
          onChange={handleUserChanges}
          required
        ></input>
      </div>

      <div className="flex flex-col items-center mb-4">
        Password
        <input
          className="m-1"
          type="password"
          id="password"
          value={credentials.password}
          name="password"
          onChange={handleUserChanges}
          required
        ></input>
      </div>

      <button
        className="like-button text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 my-1.5 text-cente"
        id="login-button"
        type="submit"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
