import axios from "axios";
import { BaseURL } from "../constants/constants";

const service = {
  get: () => axios.get(BaseURL).then(({ data }) => data),
  post: (newTask) => axios.post(BaseURL, newTask).then(({ data }) => data),
  del: (id) => axios.delete(`${BaseURL}/${id}`).then(({ data }) => data),
  update: (id, status) => axios.put(`${BaseURL}/${id}`, { status: status }),
};

export default service;
