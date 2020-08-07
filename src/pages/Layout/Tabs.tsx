import React, { useCallback, MouseEvent } from "react";
import { Tabs, Menu, Dropdown, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "@/store";
import { removeTab } from "./action";
import { useNavigate } from "react-router-dom";
const { TabPane } = Tabs;

export default () => {
  const menuItems = (
    <Menu>
      <Menu.Item>
        <div>关闭当前标签页</div>
      </Menu.Item>
      <Menu.Item>
        <div>关闭其他标签页</div>
      </Menu.Item>
      <Menu.Item>
        <div>关闭全部标签页</div>
      </Menu.Item>
    </Menu>
  );
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { tabs } = useSelector((state: AppState) => state.layoutReducer);
  const handleEdit = useCallback((key, action) => {
    if (action === "remove") {
      dispatch(removeTab(key));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleNavigate = useCallback((key, e) => {
    console.log(key, e);
  }, []);

  return (
    <Tabs
      hideAdd
      onEdit={handleEdit}
      type='editable-card'
      onTabClick={handleNavigate}
    >
      {tabs.map((v) => (
        <TabPane
          tab={
            <Dropdown overlay={menuItems} trigger={["contextMenu"]}>
              <Button>{v.title}</Button>
            </Dropdown>
          }
          key={v.key}
          closable={v.key !== "1"}
        />
      ))}
    </Tabs>
  );
};
