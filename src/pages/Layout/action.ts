import { apiSystemMenuGetTree } from "@/api/apis/system";
import { Dispatch } from "react";
import { Menu } from "@/api/apis/system";
import { message } from "antd";
import { TabItem } from "./reducer";
import { deprecated, ActionType } from "typesafe-actions";

const { createAction } = deprecated;
/**
 * 添加菜单树
 */
export const setMenuTree = createAction("layout/SET_MENU_TREE", (action) => {
  return (menus: Menu[]) => action(menus);
});
/**
 * 添加标签页
 */
export const addTab = createAction("layout/ADD_TAB", (action) => {
  return (tab: TabItem) => action(tab);
});
/**
 * 设置标签页
 */
export const setTabs = createAction("layout/SET_TABS", (action) => {
  return (tabs: TabItem[]) => action(tabs);
});
/**
 * 删除标签页
 */
export const removeTab = createAction("layout/REMOVE_TAB", (action) => {
  return (key: string) => action(key);
});
/**
 * 删除右侧标签
 */
export const removeRightTabs = createAction(
  "layout/REMOVE_RIGHT_TABS",
  (action) => {
    return (key: string) => action(key);
  }
);
/**
 * 删除其他标签
 */
export const removeOtherTabs = createAction(
  "layout/REMOVE_OTHER_TABS",
  (action) => {
    return (key: string) => action(key);
  }
);
/**
 * 删除全部标签页
 */
export const removeAllTabs = createAction("layout/REMOVE_ALL_TABS");

/**
 * 登录
 * @param payload
 */
export const getMenuTree = () => async (
  dispatch: Dispatch<ActionType<typeof setMenuTree>>
) => {
  try {
    const menus = await apiSystemMenuGetTree();
    dispatch(setMenuTree(menus));
  } catch (error) {
    message.error("初始化菜单失败");
  }
};
