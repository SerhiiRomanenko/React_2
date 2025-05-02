import axios from "axios";

const API = "https://68147a48225ff1af1628f5cd.mockapi.io/users";
const services = {
  get: () => axios.get(API).then(({ data }) => data),
  delete: (id) => axios.delete(`${API}/${id}`).then(({ data }) => data),
  put: (id, obj) => axios.put(`${API}/${id}`, obj).then(({ data }) => data),
  post: (obj) => axios.post(API, obj).then(({ data }) => data),
};

export { API, services };
