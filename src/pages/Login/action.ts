import { LoginReq, User } from "@/api/types";
import { Action } from "redux";
import { apiAuthLlogin, apiSystemUserGetProfile } from "@/api/system";
import { Dispatch } from "react";

export const LOGIN = "LOGIN";
export const ADD_USER = "ADD_USER";
export const CLEAR_USER = "CLEAR_USER";

export interface AddUser extends Action<typeof ADD_USER> {
  payload: User;
}
export interface ClearUser extends Action<typeof CLEAR_USER> {}
/**
 * 添加用户登录状态
 * @param payload
 */
export const addUser = (payload: User): AddUser => ({
  type: ADD_USER,
  payload,
});
/**
 * 清除用户信息
 */
export const clearUser = (): ClearUser => ({ type: CLEAR_USER });
/**
 * 登录
 * @param payload
 */
export const login = (payload: LoginReq) => async (
  dispatch: Dispatch<AddUser>
): Promise<Boolean> => {
  const token = await apiAuthLlogin(payload);
  if (token) {
    const user = await apiSystemUserGetProfile();
    dispatch(addUser(user));
    localStorage.setItem("TOKEN", token);
    return true;
  }
  return false;
};

export type LoginActions = AddUser | ClearUser;
