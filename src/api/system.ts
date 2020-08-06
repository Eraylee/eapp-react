import { GET, POST } from "./base";
import { Menu, LoginReq, User } from "./types";

/**
 * 获取菜单树
 */
export const apiSystemMenuGetTree = (): Promise<Menu[]> => {
  return GET("/system/menu/getTree");
};
/**
 * 登录
 * @param params
 */
export const apiAuthLlogin = (params: LoginReq): Promise<string> => {
  return POST("/auth/login", params);
};
/**
 * 获取当前用户信息
 */
export const apiSystemUserGetProfile = (): Promise<User> => {
  return POST("/system/user/getProfile");
};
