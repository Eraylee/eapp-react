import React, { lazy } from "react";
import { useRoutes } from "react-router-dom";
import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import AuthorizedRoute from "@/components/AuthorizedRoute";

const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Menu = lazy(() => import("@/pages/System/Menu"));
const User = lazy(() => import("@/pages/System/User"));
const Role = lazy(() => import("@/pages/System/Role"));
const LoginInfo = lazy(() => import("@/pages/Log/LoginInfo"));

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
        {
          path: "system/user",
          element: <AuthorizedRoute element={<User />} />,
        },
        {
          path: "system/role",
          element: <AuthorizedRoute element={<Role />} />,
        },
        {
          path: "log/loginInfo",
          element: <AuthorizedRoute element={<LoginInfo />} />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
};
