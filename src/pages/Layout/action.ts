import { Action } from "redux";
import { apiSystemMenuGetTree } from "@/api/system";
import { Dispatch } from "react";
import { Menu } from "@/api/types";
import { message } from "antd";

export const ADD_MENU_TREE = "ADD_MENU_TREE";

export interface AddMenuTree extends Action<typeof ADD_MENU_TREE> {
  payload: Menu[];
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
 * 登录
 * @param payload
 */
export const getMenuTree = () => async (dispatch: Dispatch<AddMenuTree>) => {
  try {
    const menus = await apiSystemMenuGetTree();
    console.log(menus);
    dispatch(addMenuTree(menus));
  } catch (error) {
    message.error("初始化菜单失败");
  }
};

export type LayoutActions = AddMenuTree;
