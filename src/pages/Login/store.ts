import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  User,
  LoginReq,
  apiAuthLlogin,
  apiSystemUserGetProfile,
} from "@/api/apis/system";
import { message } from "antd";
import { Dispatch } from "react";

export interface LoginState {
  user: Partial<User>;
}
const initialState: LoginState = {
  user: {},
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = initialState.user;
    },
  },
});

export const { setUser, clearUser } = loginSlice.actions;

export const login = (payload: LoginReq) => async (
  dispatch: Dispatch<ReturnType<typeof setUser>>
): Promise<Boolean> => {
  try {
    const token = await apiAuthLlogin(payload);
    if (token) {
      const user = await apiSystemUserGetProfile();
      dispatch(setUser(user));
      localStorage.setItem("TOKEN", token);
      localStorage.setItem("USER_INFO", JSON.stringify(user));
      message.success("登录成功");
      return true;
    }
  } catch (error) {
    message.error(error?.message ?? "登录失败");
  }
  return false;
};
/**
 * 退出登录
 */
export const logout = () => async (
  dispatch: Dispatch<ReturnType<typeof clearUser>>
) => {
  localStorage.removeItem("TOKEN");
  localStorage.removeItem("USER_INFO");
  dispatch(clearUser());
};

export default loginSlice.reducer;
