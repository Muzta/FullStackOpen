import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = (person) => {
  return axios.post(baseUrl, person).then((response) => response.data);
};

const remove = (personId) => {
  return axios.delete(`${baseUrl}/${personId}`);
};

const update = (personId, newPerson) => {
  return axios
    .put(`${baseUrl}/${personId}`, newPerson)
    .then((response) => response.data);
};

export default { getAll, create, remove, update };
