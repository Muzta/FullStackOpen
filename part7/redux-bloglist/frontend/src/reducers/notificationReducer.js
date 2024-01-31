import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification(state, action) {
      return "";
    },
  },
});

const { setNotification, clearNotification } = notificationSlice.actions;

let timeoutCounter = null;

export const createNotification = ({ message, timeout = 5, error = false }) => {
  return async (dispatch) => {
    if (timeoutCounter) clearTimeout(timeoutCounter);

    dispatch(setNotification({ message, error }));
    timeoutCounter = setTimeout(() => {
      dispatch(clearNotification());
    }, timeout * 1000);
  };
};

export default notificationSlice.reducer;
