import React, { useCallback, useMemo } from "react";
import { Tabs, Menu, Dropdown, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "@/store";
import { removeTab, setCurrentTabIndex } from "./action";
import { useNavigate } from "react-router-dom";
const { TabPane } = Tabs;

export default () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { tabs } = useSelector((state: AppState) => state.layoutReducer);
  const handleEdit = useCallback((key, action) => {
    if (action === "remove") {
      dispatch(removeTab(key));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRemove = useCallback( () =>{

  },[])

  const menuItems = useMemo(() =>   (
    <Menu>
      <Menu.Item onClick={handleRemove}>
        <div>关闭当前标签页</div>
      </Menu.Item>
      <Menu.Item>
        <div>关闭右侧标签页</div>
      </Menu.Item>
      <Menu.Item>
        <div>关闭其他标签页</div>
      </Menu.Item>
      <Menu.Item>
        <div>关闭全部标签页</div>
      </Menu.Item>
    </Menu>
  ),[]);

  const handleClick = useCallback(
    (key) => {
      const currentTabIndex = tabs.findIndex((v) => v.key === key);
      const currentTab = tabs.find((v) => v.key === key);
      console.log(currentTabIndex, currentTab, key);
      if (currentTab) {
        dispatch(setCurrentTabIndex(currentTabIndex));
        nav(currentTab.path);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tabs]
  );

  return (
    <Tabs
      hideAdd
      className='layout-tabs-root'
      size='small'
      onEdit={handleEdit}
      type='editable-card'
      onTabClick={handleClick}
    >
      {tabs.map((v, k) => (
        <TabPane
          tab={
            <Dropdown overlay={menuItems} trigger={["contextMenu"]}>
              <Button type='text'>{v.title}</Button>
            </Dropdown>
          }
          key={v.key}
          closable={k !== 0}
        />
      ))}
    </Tabs>
  );
};
