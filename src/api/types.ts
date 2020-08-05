export enum Enabled {
  TRUE = 1,
  FALSE = 2,
}

export interface Result<T> {
  code: number;
  message: string;
  data: T;
}

export enum Visiable {
  TRUE = 1,
  FALSE = 2,
}

export enum OrderTypes {
  DESC,
  ASC,
}

export enum MenuTypes {
  LAYOUT = 1,
  API = 2,
  ROUTE = 3,
}

export interface Menu {
  id: number;
  name: string;
  action: string;
  icon: string;
  type: MenuTypes;
  path: string;
  visiable: Visiable;
  children: Menu[];
}

export interface User {
  id: number;
  username: string;
  nickname: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface LoginReq {
  username: string;
  password: string;
}
