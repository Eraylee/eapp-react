import React, { lazy } from "react";
import { useRoutes } from "react-router-dom";
import Layout from "@/components/Layout";
import Login from "@/pages/Login";

const Dashboard = lazy(() => import("@/pages/Dashboard"));

export default () => {
  return useRoutes([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
      ],
    },
  ]);
};
