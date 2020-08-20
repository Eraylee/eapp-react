import React, { useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router";


import SiderLayout from "./Sider";
import HeaderLayout from "./Header";
import TabsLayout from "./Tabs";
import { AppState } from "@/store";
import { useSelector } from "react-redux";

import "./style.less";

const { Header, Content, Footer, Sider } = Layout;

export default () => {
  const [collapsed, setCollapsed] = useState(false);
  const { theme } = useSelector((state: AppState) => state.globalReducer);

  const handleToggle = () => {
    setCollapsed((v) => !v);
  };

  return (
    <Layout className='layout-root'>
      <Sider
        className='sider'
        theme={theme.name}
        collapsible
        collapsed={collapsed}
        onCollapse={handleToggle}
      >
        <SiderLayout themeName={theme.name} />
      </Sider>
      <Layout className='layout'>
        <Header className='header'>
          <HeaderLayout />
        </Header>
        <div style={{ height: 20 }} />
        <Content style={{ margin: "0 16px" }}>
          <TabsLayout />
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>Made by ❤ ERAYLEE</Footer>
      </Layout>
    </Layout>
  );
};
