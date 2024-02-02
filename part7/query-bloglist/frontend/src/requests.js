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
