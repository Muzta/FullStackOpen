import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "./reducers/blogReducer";
import notificationReducer from "./reducers/notificationReducer";
import userReducer from "./reducers/userReducer";
import usersViewReducer from "./reducers/usersViewReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    user: userReducer,
    usersView: usersViewReducer,
  },
});

export default store;
