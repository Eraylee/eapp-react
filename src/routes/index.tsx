import React, { lazy } from "react";
import { useRoutes } from "react-router-dom";
import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import AuthorizedRoute from "@/components/AuthorizedRoute";

const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Menu = lazy(() => import("@/pages/System/Menu"));

export default () => {
  return useRoutes([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "",
      element: <AuthorizedRoute element={<Layout />} />,
      children: [
        {
          path: "dashboard",
          element: <AuthorizedRoute element={<Dashboard />} />,
        },
        {
          path: "system/menu",
          element: <AuthorizedRoute element={<Menu />} />,
        },
      ],
    },
  ]);
};
