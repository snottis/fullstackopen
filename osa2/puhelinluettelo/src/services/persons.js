import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = (obj) => {
  return axios.post(baseUrl, obj).then((response) => response.data);
};

const remove = (id) => {
  console.log(id);
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

const update = (id, data) => {
  return axios.put(`${baseUrl}/${id}`, data).then((response) => response.data);
};
export default {
  getAll: getAll,
  create: create,
  remove: remove,
  update: update,
};
