import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./reducers/notificationReducer";
import blogsReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    user: userReducer,
  },
});

export default store;
