import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  apiSystemUserDelete,
  apiSystemUserQueryById,
  apiSystemUserCreate,
  apiSystemUserUpdate,
  User,
  apiSystemRoleQueryAll,
  apiSystemUserResetPassword,
} from "@/api/apis/system";
import { message } from "antd";
import { Dispatch, ReactText } from "react";
import produce from "immer";
import { DataSourceItem } from "@/components/Field/Eselect";

export interface UserState {
  formValue: Partial<User>;
  roleDataSource: DataSourceItem[];
}

export const initialState: UserState = {
  formValue: {},
  roleDataSource: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setFormValue(state, action: PayloadAction<Partial<User>>) {
      state.formValue = action.payload;
    },
    clearFormValue(state) {
      state.formValue = {};
    },
    setRoleDataSource(state, action: PayloadAction<DataSourceItem[]>) {
      state.roleDataSource = action.payload;
    },
  },
});

export const {
  setFormValue,
  clearFormValue,
  setRoleDataSource,
} = userSlice.actions;

/**
 * 获取表单详情
 */
export const getFormValue = (id: number) => async (
  dispatch: Dispatch<ReturnType<typeof setFormValue>>
) => {
  try {
    const data = await apiSystemUserQueryById(id);
    if (data.roles?.length) {
      data.roleIds = data.roles.map((v) => v.id);
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
export const createOrUpdate = async (params: Partial<User>, id?: number) => {
  try {
    //有id为修改
    if (id) {
      const updateForvValue = produce(params, (p: Partial<User>) => {
        p.id = id;
      });
      await apiSystemUserUpdate(updateForvValue);
    } else {
      await apiSystemUserCreate(params);
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
 * 删除
 * @param ids
 */
export const remove = async (ids: ReactText[]) => {
  try {
    await apiSystemUserDelete(ids);
    message.success(`删除成功`);
  } catch (error) {
    console.error(error);
    message.error(`删除失败`);
  }
};
/**
 * 获取角色数据源
 */
export const getRoleDataSource = () => async (
  dispatch: Dispatch<ReturnType<typeof setRoleDataSource>>
) => {
  try {
    const roles = await apiSystemRoleQueryAll();
    const dataSource: DataSourceItem[] = roles.map((v) => ({
      label: v.name,
      value: v.id,
    }));
    dispatch(setRoleDataSource(dataSource));
  } catch (error) {
    console.error(error);
  }
};
/**
 * 重置密码
 */
export const resetPassword = async (id: ReactText) => {
  try {
    await apiSystemUserResetPassword(id);
    message.success("操作成功");
    return true;
  } catch (error) {
    console.error(error);
    message.error("操作失败");
    return false;
  }
};

export default userSlice.reducer;
