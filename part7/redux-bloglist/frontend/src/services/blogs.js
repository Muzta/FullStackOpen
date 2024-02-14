import axios from "axios";
const baseUrl = "/api/blogs";

let config;

const setToken = (newToken) => {
  const token = `Bearer ${newToken}`;
  config = { headers: { Authorization: token } };
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const addBlog = async (blog) => {
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const likeBlog = async (blog) => {
  const blogUrl = `${baseUrl}/${blog.id}`;
  const likedBlog = { ...blog, likes: blog.likes + 1 };
  const response = await axios.put(blogUrl, likedBlog);
  return response.data;
};

const deleteBlog = async (blog) => {
  const blogUrl = `${baseUrl}/${blog.id}`;
  const response = await axios.delete(blogUrl, config);
  return response.data;
};

const addComment = async (blogId, comment) => {
  const commentUrl = `${baseUrl}/${blogId}/comments`;
  const response = await axios.post(commentUrl, comment, config);
  return response.data;
};

export default { getAll, addBlog, setToken, likeBlog, deleteBlog, addComment };
