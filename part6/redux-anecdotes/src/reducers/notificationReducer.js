import { createSlice } from "@reduxjs/toolkit";

const notificatioSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    createNotification(state, action) {
      return action.payload;
    },
    removeNotification(state, action) {
      return "";
    },
  },
});

const { createNotification, removeNotification } = notificatioSlice.actions;

let timeoutCounter = null;

export const setNotification = (message, timeout) => {
  return async (dispatch) => {
    // If a notification was currently active, reset the timeout
    if (timeoutCounter) clearTimeout(timeoutCounter);

    dispatch(createNotification(message));
    timeoutCounter = setTimeout(() => {
      dispatch(removeNotification());
    }, timeout * 1000);
  };
};

export default notificatioSlice.reducer;
