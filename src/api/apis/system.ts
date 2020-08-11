import { GET, POST } from "../base";

export enum MenuTypes {
  LAYOUT = 1,
  API,
  ROUTE,
}

export interface Menu {
  id: number;
  sort: number;
  enabled: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  action: string;
  icon: string;
  type: number;
  path: string;
  visiable: number;
  children: Menu[];
}

export interface Role {
  id: number;
  sort: number;
  enabled: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  code: string;
  menus: Menu[];
}

export interface User {
  id: number;
  sort: number;
  enabled: number;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  nickname: string;
  email: string;
  phone: string;
  avatar?: string;
  roles: Role[];
}

export interface LoginReq {
  username: string;
  password: string;
}

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

/**
 * 获取所有菜单树
 */
export const apiSystemMenugetAllTree = (): Promise<Menu[]> => {
  return GET("/system/menu/getAllTree");
};
/**
 * 通过id获取菜单详情
 * @param id
 */
export const apiSystemMenuGetById = (id: number): Promise<Menu> => {
  return GET("/system/menu/getAllTree", { id });
};
