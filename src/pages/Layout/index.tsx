import React, { useState, useCallback, useEffect } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router";

import "./style.less";
import MenuLayout from "./Menu";
import HeaderLayout from "./Header";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "@/store";
import { getMenuTree } from "./action";
import { addUser } from "../Login/action";

const { Header, Content, Footer, Sider } = Layout;

export default () => {
  const [expand, setExpand] = useState(true);
  const handleToggle = useCallback(() => {
    setExpand((v) => !v);
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    const userJSON = localStorage.getItem("USER_INFO");
    if (userJSON) {
      const user = JSON.parse(userJSON);
      dispatch(addUser(user));
    }
    dispatch(getMenuTree());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { menus } = useSelector((state: AppState) => state.layoutReducer);
  const { user } = useSelector((state: AppState) => state.loginReducer);
  return (
    <Layout className="layout-root">
      <Sider
        theme="light"
        collapsible
        collapsed={expand}
        onCollapse={handleToggle}
      >
        <div className="logo">
          <p>ERAYLEE</p>
        </div>

        <MenuLayout menus={menus} />
      </Sider>
      <Layout className="layout">
        <Header className="header" >
          <HeaderLayout user={user} />
        </Header>
        <div style={{ height: 20 }} />
        <Content style={{ margin: "0 16px" }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>Made by ❤ ERAYLEE</Footer>
      </Layout>
    </Layout>
  );
};
