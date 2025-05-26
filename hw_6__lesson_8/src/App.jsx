import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { service } from "./services/mockapi";

import Layout from "./pages/Layout";
import { HomeRoute } from "./routes/HomeRoute/HomeRoute";
import CountriesRoute from "./routes/CountriesRoute/CountriesRoute";
import { CountryRoute } from "./routes/CountryRoute/CountryRoute";
import ErrorRoute from "./routes/ErrorRoute/ErrorRoute";

function App() {
	const [countries, setCountries] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState(null);

	async function getData() {
		try {
			const response = await service.get("/all");
			setCountries(response);
			if (response.length > 0 && selectedCountry === null) {
				setSelectedCountry(response[0]);
			}
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		if (countries.length > 0 && selectedCountry === null) {
			setSelectedCountry(countries[0]);
		}
	}, [countries, selectedCountry]);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route
						index
						element={
							<HomeRoute
								selectedCountry={selectedCountry}
								countries={countries}
								setSelectedCountry={setSelectedCountry}
							/>
						}
					/>
					<Route
						path="/countries"
						element={<CountriesRoute countries={countries} />}
					/>
					<Route path="/countries/:name" element={<CountryRoute />} />
					<Route path="*" element={<ErrorRoute />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
