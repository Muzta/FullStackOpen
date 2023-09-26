import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = (newPhonebook) => {
  return axios.post(baseUrl, newPhonebook).then((response) => response.data);
};

export default { getAll, create };
