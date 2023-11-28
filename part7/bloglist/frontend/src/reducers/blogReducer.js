import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      // There's no need of sort the state as it already pushes the new blog to the end
      state.push(action.payload);
    },
    setBloglist(state, action) {
      const sortedBloglist = action.payload.sort(
        (b1, b2) => b2.likes - b1.likes
      );
      return sortedBloglist;
    },
  },
});

const { appendBlog, setBloglist } = blogSlice.actions;

export const initializeBloglist = () => {
  return async (dispatch) => {
    const bloglist = await blogService.getAll();
    dispatch(setBloglist(bloglist));
  };
};

export const addNewBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.addBlog(blog);
    dispatch(appendBlog(newBlog));
  };
};

export default blogSlice.reducer;
