import {
  Menu,
  apiSystemMenuQueryById,
  apiSystemMenuUpdate,
  apiSystemMenuCreate,
  apiSystemMenuDelete,
} from "@/api/apis/system";
import { apiSystemMenuGetAllTree } from "@/api/apis/system";
import { Dispatch, ReactText } from "react";
import { message } from "antd";
import { deprecated, ActionType } from "typesafe-actions";
import produce from "immer";
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
    return (menu: Partial<Menu>) => action(menu);
  }
);

export const getMenuTreeData = () => async (
  dispatch: Dispatch<ActionType<typeof setMenuTreeData>>
) => {
  try {
    const data = await apiSystemMenuGetAllTree();
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
    const data = await apiSystemMenuQueryById(id);
    dispatch(setFormValue(data));
  } catch (error) {
    message.error("获取数据失败");
  }
  return false;
};
/**
 * 新增或者修改
 * @param params
 */
export const createOrUpdate = (params: Partial<Menu>, id?: number) => async (
  dispatch: Dispatch<ReturnType<typeof getMenuTreeData>>
) =>  {
  try {
    //有id为修改
    if (id) {
      const updateForvValue = produce(params, (p: Partial<Menu>) => {
        p.id = id;
        p.parentId = p.parent?.id
      });
      await apiSystemMenuUpdate(updateForvValue);
    } else {
      await apiSystemMenuCreate(params);
    }
    dispatch(getMenuTreeData());
    message.success(`${id ? "修改" : "新增"}成功`);
    return true
  } catch (error) {
    console.error(error);
    message.error(`${id ? "修改" : "新增"}失败`);
    return false
  }
};

export const remove = (ids: ReactText[]) => async (
  dispatch: Dispatch<ReturnType<typeof getMenuTreeData>>
) => {
  try {
    await apiSystemMenuDelete(ids);
    dispatch(getMenuTreeData());
    message.success(`删除成功`);
  } catch (error) {
    console.error(error);
    message.error(`删除失败`);
  }
};
