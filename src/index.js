import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import DosageTable from "./components/DosageTable";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/", 
    element: <App />
  },
  {
    path: "/dosages/:animal", 
    element: <DosageTable />
  }
])

root.render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  //  </React.StrictMode>
);
