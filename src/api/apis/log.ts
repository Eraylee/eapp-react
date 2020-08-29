import { GET, PaginationOptions, PaginationResult } from "../base";

export interface Os {
  name: string;
  version: string;
}

export interface Browser {
  name: string;
  version: string;
  major: string;
}

export interface LoginInfo {
  _id: string;
  username: string;
  ip: string;
  agent: string;
  status: number;
  message: string;
  __v: number;
  os: Os;
  browser: Browser;
}

/**
 * 查询所有登录信息
 */
export const apiLogLoginInfoQueryAll = () => {
  return GET("/log/loginInfo/queryAll");
};

/**
 * 通过id查询
 */
export const apiLogLoginInfoQueryById = (id: string): Promise<LoginInfo> => {
  return GET("/log/loginInfo/queryById", { id });
};
/**
 * 分页查询
 * @param params
 */
export const apiLogLoginInfoQueryPage = (
  params: Partial<PaginationOptions>
): Promise<PaginationResult<LoginInfo>> => {
  return GET("/log/loginInfo/queryPage", params);
};
