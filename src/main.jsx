import React from "react";
import ReactDOM from "react-dom/client";
import {
  ErrorPage,
  Home,
  Volunteers,
  Activities,
  Associations,
  SingleActivity,
  SingleVolunteer,
  SingleAssociation,
  Layout,
} from "./routes";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/associations",
        element: <Associations />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/associations/:id",
        element: <SingleAssociation />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/volunteers",
        element: <Volunteers />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/volunteers/:id",
        element: <SingleVolunteer />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/activities",
        element: <Activities />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/activities/:id",
        element: <SingleActivity />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/*",
        element: <Home />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
