import React, { lazy } from "react";
import { useRoutes } from "react-router-dom";
import Layout from "@/components/Layout";

const Dashboard = lazy(() => import("@/pages/Dashboard"));

export default () => {
  return useRoutes([
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
