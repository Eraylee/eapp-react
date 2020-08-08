import { Action } from "redux";
import { apiSystemMenuGetTree } from "@/api/system";
import { Dispatch } from "react";
import { Menu } from "@/api/types";
import { message } from "antd";
import { TabItem } from "./reducer";

export const ADD_MENU_TREE = "ADD_MENU_TREE";
export const ADD_TAB = "ADD_TAB";
export const REMOVE_TAB = "REMOVE_TAB";
export const REMOVE_RIGHT_TABS = "REMOVE_RIGHT_TABS";
export const REMOVE_OTHER_TABS = "REMOVE_OTHER_TABS";
export const REMOVE_All_TABS = "REMOVE_All_TABS";
export const SET_CURRENT_TAB_INDEX = "SET_CURRENT_TAB_INDEX";

export interface AddMenuTree extends Action<typeof ADD_MENU_TREE> {
  payload: Menu[];
}
export interface AddTab extends Action<typeof ADD_TAB> {
  payload: TabItem;
}
export interface RemoveTab extends Action<typeof REMOVE_TAB> {
  payload: string;
}
export interface RemoveRightTabs extends Action<typeof REMOVE_RIGHT_TABS> {
  payload: string;
}
export interface RemoveOtherTabs extends Action<typeof REMOVE_OTHER_TABS> {
  payload: string;
}
export interface RemoveAllTabs extends Action<typeof REMOVE_All_TABS> {}

export interface SetCurrentTabIndex
  extends Action<typeof SET_CURRENT_TAB_INDEX> {
  payload: number;
}
/**
 * 添加菜单树
 * @param payload
 */
export const addMenuTree = (payload: Menu[]): AddMenuTree => ({
  type: ADD_MENU_TREE,
  payload,
});
/**
 * 添加标签页
 * @param payload
 */
export const addTab = (payload: TabItem): AddTab => ({
  type: ADD_TAB,
  payload,
});
/**
 * 删除标签页
 * @param payload
 */
export const removeTab = (payload: string): RemoveTab => ({
  type: REMOVE_TAB,
  payload,
});
/**
 * 删除右侧标签
 * @param payload
 */
export const removeRightTabs = (payload: string): RemoveRightTabs => ({
  type: REMOVE_RIGHT_TABS,
  payload,
});
/**
 * 删除其他标签
 * @param payload
 */
export const removeOtherTabs = (payload: string): RemoveOtherTabs => ({
  type: REMOVE_OTHER_TABS,
  payload,
});
/**
 * 删除全部标签页
 */
export const removeAllTabs = (): RemoveAllTabs => ({
  type: REMOVE_All_TABS,
});
/**
 * 设置当前活跃tab索引
 * @param payload
 */
export const setCurrentTabIndex = (payload: number): SetCurrentTabIndex => ({
  type: SET_CURRENT_TAB_INDEX,
  payload,
});
/**
 * 登录
 * @param payload
 */
export const getMenuTree = () => async (dispatch: Dispatch<AddMenuTree>) => {
  try {
    const menus = await apiSystemMenuGetTree();
    dispatch(addMenuTree(menus));
  } catch (error) {
    message.error("初始化菜单失败");
  }
};

export type LayoutActions =
  | AddMenuTree
  | AddTab
  | RemoveTab
  | SetCurrentTabIndex
  | RemoveRightTabs
  | RemoveOtherTabs
  | RemoveAllTabs;
