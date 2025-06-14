import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
	const authToken = localStorage.getItem("authToken");

	if (authToken) {
		return <Outlet />;
	} else {
		return <Navigate to="/login" replace />;
	}
}
