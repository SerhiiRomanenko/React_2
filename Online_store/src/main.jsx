import "./normalize.scss";
import App from "./App.jsx";

import ReactDOM from "react-dom/client";

import queryClient from "./api/QueryClient.js";
import { QueryClientProvider } from "@tanstack/react-query";

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
