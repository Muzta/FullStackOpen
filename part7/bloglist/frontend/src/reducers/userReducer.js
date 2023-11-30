import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { createNotification } from "./notificationReducer";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    logoutUser() {
      return "";
    },
  },
});

const { setUser, logoutUser } = userSlice.actions;

export const fetchLoggedUser = () => {
  return (dispatch) => {
    const localUserJSON = window.localStorage.getItem("loggedUser");
    if (localUserJSON) {
      const localUser = JSON.parse(localUserJSON);
      dispatch(setUser(localUser));
      blogService.setToken(localUser.token);
    }
  };
};

export const login = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      dispatch(setUser(user));
      blogService.setToken(user.token);
    } catch (error) {
      dispatch(
        createNotification({ message: error.response.data.error, error: true })
      );
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    window.localStorage.clear();
    dispatch(logoutUser());
    blogService.setToken(null);
  };
};

export default userSlice.reducer;
