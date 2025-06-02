import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import service from "./services/mockapi";

function App() {
	const [trailers, setTrailers] = useState([]);

	const getData = async () => {
		try {
			const response = await service.get("trailers");
			setTrailers(response.data.trailers);
			console.log(response.data.trailers);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route>
					<Route></Route>
					<Route></Route>
					<Route></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
