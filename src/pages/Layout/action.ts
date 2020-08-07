import { Action } from "redux";
import { apiSystemMenuGetTree } from "@/api/system";
import { Dispatch } from "react";
import { Menu } from "@/api/types";
import { message } from "antd";
import { TabItem } from "./reducer";

export const ADD_MENU_TREE = "ADD_MENU_TREE";
export const ADD_TAB = "ADD_TAB";
export const REMOVE_TAB = "REMOVE_TAB";

export interface AddMenuTree extends Action<typeof ADD_MENU_TREE> {
  payload: Menu[];
}
export interface AddTab extends Action<typeof ADD_TAB> {
  payload: TabItem;
}
export interface RemoveTab extends Action<typeof REMOVE_TAB> {
  payload: string;
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

export type LayoutActions = AddMenuTree | AddTab | RemoveTab;
