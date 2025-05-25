import axios from "axios";

import { API_BASE_URL } from "../constants/constants";

const service = {
  get: () => axios.get(`${API_BASE_URL}/all`).then(({ data }) => data),
};

export { service };
