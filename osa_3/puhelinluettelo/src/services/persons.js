import axios from "axios";

//const baseUrl = "http://localhost:3001/persons";
const baseUrl = "http://localhost:3001/api/persons";
//const baseUrl = "https://tranquil-spire-20597.herokuapp.com/api/persons";
//const baseUrl = "~/FSO/full_stack_open_2020-2021_osa_3/backend_puhelinluettelo";

const getAll = () => {
  const request = axios.get(baseUrl);

  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);

  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  console.log(`${baseUrl}/${id}`, "testaus taas");
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);

  return request.then((response) => response.data);
};

export default {
  getAll,
  create,
  deletePerson,
  update,
};
