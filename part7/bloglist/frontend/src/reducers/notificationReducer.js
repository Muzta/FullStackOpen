import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    createNotification(state, action) {
      return action.payload;
    },
    clearNotification(state, action) {
      return "";
    },
  },
});

const { createNotification, clearNotification } = notificationSlice.actions;

let timeoutCounter = null;

export const setNotification = ({ message, timeout, error }) => {
  return async (dispatch) => {
    if (timeoutCounter) clearTimeout(timeoutCounter);

    dispatch(createNotification({ message, error }));
    timeoutCounter = setTimeout(() => {
      dispatch(clearNotification());
    }, timeout * 1000);
  };
};

export default notificationSlice.reducer;
