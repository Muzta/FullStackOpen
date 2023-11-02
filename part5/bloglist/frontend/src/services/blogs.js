import axios from "axios";
const baseUrl = "/api/blogs";

let token;

const setToken = (newToken) => (token = `Bearer ${newToken}`);

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const addBlog = async (blog) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const likeBlog = async (blog) => {
  const blogUrl = `${baseUrl}/${blog.id}`;
  blog.likes++;
  const response = await axios.put(blogUrl, blog);
  return response.data;
};

export default { getAll, addBlog, setToken, likeBlog };
