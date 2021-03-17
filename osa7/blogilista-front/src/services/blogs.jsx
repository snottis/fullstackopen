import axios from 'axios';

const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const post = async (newBlog) => {
  const config = {
    headers:  {Authorization: token}
  };
  const result = await axios.post(baseUrl, newBlog, config);
  return result.data;
};

const put = async (blog, id) => {
  const config = {
    headers:  {Authorization: token}
  };
  const result = await axios.put(`${baseUrl}/${id}`, blog, config);
  return result.data;

};

const remove = async (id) => {
  const config = {
    headers:  {Authorization: token}
  };
  const result = await axios.delete(`${baseUrl}/${id}`, config);
  return result.data;
};

export default { getAll, post, setToken, put, remove };
