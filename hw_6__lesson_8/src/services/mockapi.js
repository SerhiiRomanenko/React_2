import axios from "axios";

const API_BASE_URL = "https://restcountries.com/v3.1";

const service = {
	get: (endpoint, name) =>
		axios
			.get(API_BASE_URL + endpoint + (name ? `/${name}` : ""))
			.then(({ data }) => data),
};

export { service };
