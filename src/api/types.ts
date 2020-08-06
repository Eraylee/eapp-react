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
  children: Menu[]
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
