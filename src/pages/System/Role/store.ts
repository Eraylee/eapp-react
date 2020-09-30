import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  apiSystemRoleDeleteBatch,
  apiSystemRoleQueryById,
  apiSystemRoleCreate,
  apiSystemRoleUpdate,
  Role,
  Menu,
  apiSystemMenuGetAllTree,
} from "@/api/apis/system";
import { message } from "antd";
import { Dispatch, ReactText } from "react";
import produce from "immer";
import { DataNode } from "antd/lib/tree";

export interface RoleState {
  treeData: DataNode[];
  formValue: Partial<Role>;
}

export const initialState: RoleState = {
  treeData: [],
  formValue: {},
};

const roleSlice = createSlice({
  name: "systemRole",
  initialState,
  reducers: {
    setTreeData(state, action: PayloadAction<DataNode[]>) {
      state.treeData = action.payload;
    },
    setFormValue(state, action: PayloadAction<Partial<Role>>) {
      state.formValue = action.payload;
    },
    clearFormValue(state) {
      state.formValue = {};
    },
  },
});

export const { setFormValue, clearFormValue, setTreeData } = roleSlice.actions;

/**
 * 获取表单详情
 */
export const getFormValue = (id: number) => async (
  dispatch: Dispatch<ReturnType<typeof setFormValue>>
) => {
  try {
    const data = await apiSystemRoleQueryById(id);
    if (data.menus?.length) {
      data.menuIds = data.menus.map((v) => v.id);
    }
    dispatch(setFormValue(data));
  } catch (error) {
    message.error("获取数据失败");
  }
};
/**
 * 新增或者修改
 * @param params
 */
export const createOrUpdate = async (
  params: Partial<Role>,
  id?: number
): Promise<boolean> => {
  try {
    //有id为修改
    if (id) {
      const updateForvValue = produce(params, (p: Partial<Role>) => {
        p.id = id;
      });
      await apiSystemRoleUpdate(updateForvValue);
    } else {
      await apiSystemRoleCreate(params);
    }
    message.success(`${id ? "修改" : "新增"}成功`);
    return true;
  } catch (error) {
    console.error(error);
    message.error(`${id ? "修改" : "新增"}失败`);
    return false;
  }
};

/**
 * 获取菜单树
 * @param payload
 */
export const getMenuTree = () => async (
  dispatch: Dispatch<ReturnType<typeof setTreeData>>
) => {
  try {
    const menus = await apiSystemMenuGetAllTree();
    const treeData = getTreeData(menus);
    dispatch(setTreeData(treeData));
  } catch (error) {
    message.error("初始化菜单失败");
  }
};
export const remove = async (ids: ReactText[]) => {
  try {
    await apiSystemRoleDeleteBatch(ids);
    message.success(`删除成功`);
  } catch (error) {
    console.error(error);
    message.error(`删除失败`);
  }
};
//递归获取子节点数据
const getTreeData = (rawData: Menu[]): DataNode[] => {
  return rawData.map((v) => ({
    key: v.id,
    title: v.name,
    children: getTreeData(v.children),
  }));
};

export default roleSlice.reducer;
