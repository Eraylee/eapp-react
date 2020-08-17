import { LoginReq, User } from "@/api/apis/system";
import { apiAuthLlogin, apiSystemUserGetProfile } from "@/api/apis/system";
import { Dispatch } from "react";
import { message } from "antd";
import { deprecated, ActionType } from "typesafe-actions";
const { createAction } = deprecated;

export const setUser = createAction("login/SET_USER", (action) => {
  return (user: User) => action(user);
});

export const clearUser = createAction("login/CLEAR_USER");
/**
 * 登录
 * @param payload
 */
export const login = (payload: LoginReq) => async (
  dispatch: any
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
  dispatch: Dispatch<ActionType<typeof clearUser>>
) => {
  localStorage.removeItem("TOKEN");
  localStorage.removeItem("USER_INFO");
  dispatch(clearUser());
};

