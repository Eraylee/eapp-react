import React, { useState, useCallback, useEffect } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router";

import "./style.less";
import MenuLayout from "./Menu";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "@/store";
import { getMenuTree } from "./action";
const { Header, Content, Footer, Sider } = Layout;

export default () => {
  const [expand, setExpand] = useState(true);
  const handleToggle = useCallback(() => {
    setExpand((v) => !v);
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMenuTree());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { menus } = useSelector((state: AppState) => state.layoutReducer);
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
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <div style={{ height: 20 }} />
        <Content style={{ margin: "0 16px" }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>Made by ❤ ERAYLEE</Footer>
      </Layout>
    </Layout>
  );
};
