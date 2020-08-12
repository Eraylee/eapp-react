import React, { useCallback, useEffect } from "react";
import { Tabs, Menu, Dropdown, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "@/store";
import {
  removeTab,
  removeRightTabs,
  removeAllTabs,
  removeOtherTabs,
  setActiveKey,
} from "./action";
import { useNavigate } from "react-router-dom";
import { TabItem } from "./reducer";
const { TabPane } = Tabs;

export default () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { tabs, activeKey } = useSelector(
    (state: AppState) => state.layoutReducer
  );
  //刷新之后调转到首页
  useEffect(() => {
    nav("/dashboard");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleEdit = useCallback((key, action) => {
    if (action === "remove") {
      dispatch(removeTab(key));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /**
   * 删除当前标签
   */
  const handleRemove = useCallback(
    (key: string) => () => {
      dispatch(removeTab(key));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  /**
   * 删除右侧标签
   */
  const handleRemoveRight = useCallback(
    (key: string) => () => {
      dispatch(removeRightTabs(key));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  /**
   * 删除其他标签
   */
  const handleRemoveOther = useCallback(
    (key: string) => () => {
      dispatch(removeOtherTabs(key));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  /**
   * 删除全部标签
   */
  const handleRemoveAll = useCallback(() => {
    dispatch(removeAllTabs());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getIsRemoveCurrentDisabled = (index: number) => index === 0;

  const getIsRemoveRightDisabled = (index: number, length: number) =>
    index === length - 1;

  const getMenuItems = useCallback(
    (tab: TabItem, index: number) => (
      <Menu>
        <Menu.Item
          onClick={handleRemove(tab.key)}
          disabled={getIsRemoveCurrentDisabled(index)}
        >
          <div>关闭当前标签页</div>
        </Menu.Item>
        <Menu.Item
          onClick={handleRemoveRight(tab.key)}
          disabled={getIsRemoveRightDisabled(index, tabs.length)}
        >
          <div>关闭右侧标签页</div>
        </Menu.Item>
        <Menu.Item onClick={handleRemoveOther(tab.key)}>
          <div>关闭其他标签页</div>
        </Menu.Item>
        <Menu.Item onClick={handleRemoveAll}>
          <div>关闭全部标签页</div>
        </Menu.Item>
        <Menu.Item>
          <div>刷新当前标签页</div>
        </Menu.Item>
      </Menu>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tabs]
  );

  const handleClick = useCallback(
    (key) => {
      const currentTab = tabs.find((v) => v.key === key);
      if (currentTab) {
        nav(currentTab.path);
      }
      dispatch(setActiveKey(key));
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
      activeKey={activeKey}
    >
      {tabs.map((v, k) => (
        <TabPane
          tab={
            <Dropdown overlay={getMenuItems(v, k)} trigger={["contextMenu"]}>
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
