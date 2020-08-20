import { GET, POST, PaginationOptions, PaginationResult } from "../base";
import { ReactText } from "react";

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
  parent: Menu;
  parentId: number;
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

export interface QueryUserReq
  extends Partial<User>,
    Partial<PaginationOptions> {}

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
export const apiSystemMenuGetAllTree = (): Promise<Menu[]> => {
  return GET("/system/menu/getAllTree");
};
/**
 * 通过id获取菜单详情
 * @param id
 */
export const apiSystemMenuQueryById = (id: number): Promise<Menu> => {
  return GET("/system/menu/queryById", { id });
};
/**
 * 新增菜单
 * @param params
 */
export const apiSystemMenuCreate = (params: Partial<Menu>): Promise<Menu> => {
  return POST("/system/menu/create", params);
};
/**
 * 修改菜单
 * @param params
 */
export const apiSystemMenuUpdate = (params: Partial<Menu>): Promise<Menu> => {
  return POST("/system/menu/update", params);
};
/**
 * 删除菜单
 * @param ids
 */
export const apiSystemMenuDelete = (ids: ReactText[]) => {
  return POST("/system/menu/delete", { ids });
};
/**
 * 分页查询用户
 * @param params
 */
export const apiSystemUserQueryPage = (
  params: QueryUserReq
): Promise<PaginationResult<User>> => {
  return GET("/system/user/queryPage", params);
};
/**
 * 通过id获取菜单详情
 * @param id
 */
export const apiSystemUserQueryById = (id: number): Promise<User> => {
  return GET("/system/user/queryById", { id });
};
/**
 * 创建用户
 * @param params
 */
export const apiSystemUserCreate = (params: Partial<User>) => {
  return POST("/system/user/create", params);
};
/**
 * 修改用户
 * @param params
 */
export const apiSystemUserUpdate = (params: Partial<User>) => {
  return POST("/system/user/update", params);
};
/**
 * 删除用户
 * @param ids
 */
export const apiSystemUserDelete = (ids: ReactText[]) => {
  return POST("/system/user/delete", { ids });
};
