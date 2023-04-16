import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import DrugTable from "./components/DrugTable";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path:"/", element:<App />
  },
  {
    path:"/drugs/:animal", element:<DrugTable />
  }
])
root.render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  //  </React.StrictMode>
);