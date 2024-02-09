import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/user";
import { createNotification } from "./notificationReducer";

const usersViewSlice = createSlice({
  name: "usersView",
  initialState: [],
  reducers: {
    setUsersView(state, action) {
      return action.payload;
    },
  },
});

const { setUsersView } = usersViewSlice.actions;

export const initializeUsersDictionary = () => {
  return async (dispatch) => {
    try {
      const users = await userService.getAllUsers();
      dispatch(setUsersView(users));
    } catch (error) {
      dispatch(
        createNotification({ message: error.response.data.error, error: true })
      );
    }
  };
};

export default usersViewSlice.reducer;
