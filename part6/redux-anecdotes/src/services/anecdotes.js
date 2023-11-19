import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const anecdote = { content, votes: 0 };
  const response = await axios.post(baseUrl, anecdote);
  return response.data;
};

const vote = async (id) => {
  const anecdoteUrl = `${baseUrl}/${id}`;
  const res = await axios.get(anecdoteUrl);
  const anecdoteToUpdate = res.data;
  anecdoteToUpdate.votes++;
  const response = await axios.put(anecdoteUrl, anecdoteToUpdate);
  return response.data;
};

export default { getAll, createNew, vote };
