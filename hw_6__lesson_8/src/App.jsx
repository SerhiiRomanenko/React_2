import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import HomeRoute from "./routes/HomeRoute/HomeRoute";
import CountriesRoute from "./routes/CountriesRoute/CountriesRoute";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<HomeRoute />} />
					<Route path="/countries" element={<CountriesRoute />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
