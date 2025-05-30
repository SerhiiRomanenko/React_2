import axios from "axios";

import { API_BASE_URL } from "../constants/constants";

const service = {
  get: (endpoint, id) =>
    axios
      .get(API_BASE_URL + `/${endpoint}` + (id ? `/${id}` : ``))
      .then(({ data }) => data),
  delete: (endpoint, id) =>
    axios
      .delete(API_BASE_URL + `/${endpoint}` + `/${id}`)
      .then(({ data }) => data),
  put: (endpoint, id, obj) =>
    axios
      .put(API_BASE_URL + `/${endpoint}` + `/${id}`, obj)
      .then(({ data }) => data),
  post: (endpoint, obj) =>
    axios.post(API_BASE_URL + `/${endpoint}`, obj).then(({ data }) => data),
};

export default service;
