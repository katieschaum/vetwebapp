import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import DosageTable from "./components/DosageTable";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EditAnimal from "./screens/editAnimal";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/", 
    element: <App />
  },
  {
    path: "/dosages/:animal", 
    element: <DosageTable />
  },
  {
    path:"/animals/:animalId", element:<EditAnimal></EditAnimal>
  },
])

root.render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  //  </React.StrictMode>
);
