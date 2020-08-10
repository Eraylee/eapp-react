import { Menu } from "@/api/types";
import { Action } from "redux";
import { apiSystemMenugetAllTree } from "@/api/system";
import { Dispatch } from "react";
import { message } from "antd";

export const GET_MENU_TREE = "GET_MENU_TREE";
export const SET_MENU_TREE = "SET_MENU_TREE";

export interface SetMenuTreeData extends Action<typeof SET_MENU_TREE> {
  payload: Menu[];
}

/**
 * 设置属性数据
 * @param payload
 */
export const setMenuTreeData = (payload: Menu[]): SetMenuTreeData => ({
  type: SET_MENU_TREE,
  payload,
});

export const getMenuTreeData = () => async (
  dispatch: Dispatch<SetMenuTreeData>
) => {
  try {
    const data = await apiSystemMenugetAllTree();
    dispatch(setMenuTreeData(data));
  } catch (error) {
    message.error("获取数据失败");
  }
  return false;
};

export type menuActions = SetMenuTreeData;
