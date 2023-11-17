import { createSlice } from "@reduxjs/toolkit";

const notificatioSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
  },
});

export const { setNotification } = notificatioSlice.actions;
export default notificatioSlice.reducer;
