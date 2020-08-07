import React, { useState, useCallback } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router";

import "./style.less";
import SiderLayout from "./Sider";
import HeaderLayout from "./Header";
import TabsLayout from "./Tabs";

const { Header, Content, Footer, Sider } = Layout;

export default () => {
  const [expand, setExpand] = useState(true);
  const handleToggle = useCallback(() => {
    setExpand((v) => !v);
  }, []);

  return (
    <Layout className='layout-root'>
      <Sider
        theme='light'
        collapsible
        collapsed={expand}
        onCollapse={handleToggle}
      >
        <SiderLayout />
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
