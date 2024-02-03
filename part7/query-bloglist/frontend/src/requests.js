import axios from "axios";
const baseUrl = "/api/blogs";

let config;

export const setToken = (newToken) => {
  const token = `Bearer ${newToken}`;
  config = { headers: { Authorization: token } };
};

export const getBlogs = () =>
  axios.get(baseUrl).then((response) => response.data);

export const addBlog = async (blog) => {
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

export const deleteBlog = async (blog) => {
  const blogUrl = `${baseUrl}/${blog.id}`;
  const response = await axios.delete(blogUrl, config);
  return response.data;
};

export const likeBlog = async (blog) => {
  const blogUrl = `${baseUrl}/${blog.id}`;
  const updatedBlog = { ...blog, likes: blog.likes + 1 };
  const response = await axios.put(blogUrl, updatedBlog);
  return response.data;
};
