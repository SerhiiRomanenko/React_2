import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomeRoute from "./routes/HomeRoute";
import DetailsRoute from "./routes/DetailsRoute";
import ContactsRoute from "./routes/ContactsRoute";
import ErrorRoute from "./routes/ErrorRoute";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomeRoute />}>
					<Route path="/details" element={<DetailsRoute />} />
					<Route path="/contacts" element={<ContactsRoute />} />
					<Route path="*" element={<ErrorRoute />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
