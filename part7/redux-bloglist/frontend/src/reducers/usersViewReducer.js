import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/user";
import { createNotification } from "./notificationReducer";

const usersViewSlice = createSlice({
  name: "usersView",
  initialState: {},
  reducers: {
    setUsersView(state, action) {
      return action.payload;
    },
  },
});

const { setUsersView } = usersViewSlice.actions;

export const createUsersDictionary = () => {
  return async (dispatch) => {
    try {
      const users = await userService.getAllUsers();
      const userDictionary = {};

      // Create a dictionary with two only values: username as key and n of blogs as value
      users.forEach((user) => {
        userDictionary[user.name] = user.blogs.length;
      });

      dispatch(setUsersView(userDictionary));
    } catch (error) {
      dispatch(
        createNotification({ message: error.response.data.error, error: true })
      );
    }
  };
};

export default usersViewSlice.reducer;
