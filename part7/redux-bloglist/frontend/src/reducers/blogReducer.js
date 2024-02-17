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
    likeBlogById(state, action) {
      const likedBlogId = action.payload;
      const blogToLike = state.find((blog) => blog.id === likedBlogId);
      const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1 };
      const newState = state.map((blog) =>
        blog.id === likedBlogId ? likedBlog : blog
      );
      newState.sort((b1, b2) => b2.likes - b1.likes);
      return newState;
    },
    deleteBlogById(state, action) {
      const removedBlogId = action.payload;
      return state.filter((blog) => blog.id !== removedBlogId);
    },
    addCommentById(state, action) {
      // Add a comment to a blog, given its id
      const blogToCommentId = action.payload.blogId;
      const blogToComment = state.find((blog) => blog.id === blogToCommentId);
      const commentedBlog = {
        ...blogToComment,
        comments: blogToComment.comments.concat(action.payload.comment),
      };

      const newState = state.map((blog) =>
        blog.id === blogToCommentId ? commentedBlog : blog
      );
      return newState;
    },
  },
});

const {
  appendBlog,
  setBloglist,
  likeBlogById,
  deleteBlogById,
  addCommentById,
} = blogSlice.actions;

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

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const returnedBlog = await blogService.likeBlog(blog);
    dispatch(likeBlogById(returnedBlog.id));
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blog);
    dispatch(deleteBlogById(blog.id));
  };
};

export const addComment = (blogId, comment) => {
  return async (dispatch) => {
    const newComment = await blogService.addComment(blogId, comment);
    dispatch(addCommentById({ blogId, comment: newComment }));
  };
};

export default blogSlice.reducer;
