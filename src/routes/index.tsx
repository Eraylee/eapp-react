import React, { lazy } from "react";
import { useRoutes } from "react-router-dom";
import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import AuthorizedRoute from "@/components/AuthorizedRoute";

const Dashboard = lazy(() => import("@/pages/Dashboard"));

export default () => {
  return useRoutes([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "",
      element: (
        <AuthorizedRoute>
          <Layout />
        </AuthorizedRoute>
      ),
      children: [
        {
          path: "dashboard",
          element: (
            <AuthorizedRoute>
              <Dashboard />
            </AuthorizedRoute>
          ),
        },
      ],
    },
  ]);
};
