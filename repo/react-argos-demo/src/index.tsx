import "react-argos/dist/main.css";

import React from "react";
import ReactDOM from "react-dom";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { Graphic } from "./pages/graphic/Graphic";
import { Dashboard } from "./pages/dashboard/Dashboard";

const router = createHashRouter([
  {
    path: "/",
    element: <Graphic />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

ReactDOM.render(
  <RouterProvider router={router} />,
  document.getElementById("root")
);
