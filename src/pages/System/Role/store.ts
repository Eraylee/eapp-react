import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  apiSystemRoleDelete,
  apiSystemRoleQueryById,
  apiSystemRoleCreate,
  apiSystemRoleUpdate,
  Role,
} from "@/api/apis/system";
import { message } from "antd";
import { Dispatch, ReactText } from "react";
import produce from "immer";

export interface RoleState {
  formValue: Partial<Role>;
}

export const initialState: RoleState = {
  formValue: {},
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setFormValue(state, action: PayloadAction<Partial<Role>>) {
      state.formValue = action.payload;
    },
    clearFormValue(state) {
      state.formValue = {};
    },
  },
});

export const { setFormValue, clearFormValue } = roleSlice.actions;

/**
 * 获取表单详情
 */
export const getFormValue = (id: number) => async (
  dispatch: Dispatch<ReturnType<typeof setFormValue>>
) => {
  try {
    const data = await apiSystemRoleQueryById(id);
    if(data.menus?.length){
      data.menuIds = data.menus.map( v => v.id)
    }
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
export const createOrUpdate = (params: Partial<Role>, id?: number) => async (
  dispatch: any
) => {
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

export const remove = (ids: ReactText[]) => async (dispatch: any) => {
  try {
    await apiSystemRoleDelete(ids);
    message.success(`删除成功`);
  } catch (error) {
    console.error(error);
    message.error(`删除失败`);
  }
};

export default roleSlice.reducer;
