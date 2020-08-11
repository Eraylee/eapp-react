import { Menu, apiSystemMenuGetById } from "@/api/apis/system";
import { apiSystemMenugetAllTree } from "@/api/apis/system";
import { Dispatch } from "react";
import { message } from "antd";
import { deprecated, ActionType } from "typesafe-actions";
const { createAction } = deprecated;

/**
 * 设置树形数据
 */
export const setMenuTreeData = createAction(
  "system/menu/SET_MENU_TREE",
  (action) => {
    return (menus: Menu[]) => action(menus);
  }
);
/**
 * 初始化表单
 */
export const setFormValue = createAction(
  "system/menu/SET_FORM_VALUE",
  (action) => {
    return (menu: Menu) => action(menu);
  }
);

export const getMenuTreeData = () => async (
  dispatch: Dispatch<ActionType<typeof setMenuTreeData>>
) => {
  try {
    const data = await apiSystemMenugetAllTree();
    dispatch(setMenuTreeData(data));
  } catch (error) {
    message.error("获取数据失败");
  }
  return false;
};
/**
 * 获取表单详情
 */
export const getFormValue = (id: number) => async (
  dispatch: Dispatch<ActionType<typeof setFormValue>>
) => {
  try {
    const data = await apiSystemMenuGetById(id);
    dispatch(setFormValue(data));
  } catch (error) {
    message.error("获取数据失败");
  }
  return false;
};
