import axios, { AxiosError, AxiosResponse } from "axios";
import { message } from "antd";

let BASE_API = "";

if (process.env.NODE_ENV !== "development") {
  BASE_API = process.env.REACT_APP_API as string;
}

/**
 * 设置默认Content-Type
 */
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.baseURL = BASE_API;

/**
 * request拦截器
 */
axios.interceptors.request.use(
  (config) => {
    const USER_INFO = localStorage.getItem("USER_INFO");
    if (USER_INFO) {
      const token = JSON.parse(USER_INFO).token;
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
/**
 * response拦截器
 */
axios.interceptors.response.use(
  async (res: AxiosResponse) => {
    return res?.data;
  },
  async (err: AxiosError) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem("USER_INFO");
      message.error("请重新登录");
    }
    return err?.response?.data;
  }
);

/**
 * 封装get方法
 * @param url
 * @param params
 */
export const GET = async <P extends { [key: string]: any }, R>(
  url: string,
  params?: P
): Promise<R> => {
  return await axios.get<P, R>(url, { params });
};
/**
 * 封装post请求
 * @param url
 * @param data
 */
export const POST = async <P extends { [key: string]: any }, R>(
  url: string,
  data?: P
): Promise<R> => {
  return await axios.post<P, R>(url, data);
};
