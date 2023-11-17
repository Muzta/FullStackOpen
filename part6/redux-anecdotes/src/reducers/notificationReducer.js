import { createSlice } from "@reduxjs/toolkit";

const notificatioSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    removeNotification(state, action) {
      return "";
    },
  },
});

export const { setNotification, removeNotification } = notificatioSlice.actions;
export default notificatioSlice.reducer;
