import { ROUTES } from "./utils/constants";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout/Layout";
import TrailerDetails from "./components/TrailerDetails/TrailerDetails";

import HomeRoute from "./routes/HomeRoute/HomeRoute";
import DetailsRoute from "./routes/DetailsRoute/DetailsRoute";
import ContactsRoute from "./routes/ContactsRoute/ContactsRoute";
import ErrorRoute from "./routes/ErrorRoute/ErrorRoute";
import LoginPage from "./pages/LoginPage/LoginPage";
import PrivateRoute from "./routes/PrivateRoute/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />

        <Route path={ROUTES.HOME} element={<Layout />}>
          <Route element={<PrivateRoute />}>
            <Route index element={<HomeRoute />} />
            <Route
              path={ROUTES.TRAILER + "/:id"}
              element={<TrailerDetails />}
            />
            <Route path={ROUTES.DETAILS} element={<DetailsRoute />} />
            <Route path={ROUTES.CONTACTS} element={<ContactsRoute />} />
          </Route>
          <Route path="*" element={<ErrorRoute />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
