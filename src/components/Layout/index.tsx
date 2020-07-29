import React, { Suspense, useState, useCallback } from "react";
import { Layout, Menu } from "antd";
import { Outlet } from "react-router";
import { Spin } from "antd";
import "./style.less";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

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
        <div className='logo'>
          <p>ERAYLEE</p>
        </div>

        <Menu defaultSelectedKeys={["1"]} mode='inline'>
          <Menu.Item key='1'>Option 1</Menu.Item>
          <Menu.Item key='2'>Option 2</Menu.Item>
          <SubMenu key='sub1' title='User'>
            <Menu.Item key='3'>Tom</Menu.Item>
            <Menu.Item key='4'>Bill</Menu.Item>
            <Menu.Item key='5'>Alex</Menu.Item>
          </SubMenu>
          <Menu.Item key='9' />
        </Menu>
      </Sider>
      <Layout className='site-layout'>
        <Header className='site-layout-background' style={{ padding: 0 }} />
        <div style={{ height: 20 }} />
        <Content style={{ margin: "0 16px" }}>
          <Suspense fallback={<Spin />}>
            <Outlet />
          </Suspense>
        </Content>
        <Footer style={{ textAlign: "center" }}>Made by ❤ ERAYLEE</Footer>
      </Layout>
    </Layout>
  );
};
