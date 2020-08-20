import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Menu, apiSystemMenuGetTree } from "@/api/apis/system";
import { Dispatch } from "react";
import { message } from "antd";

export interface TabItem {
  title: string;
  path: string;
  key: string;
}

export enum ThemeName {
  LIGHT = "light",
  DARK = "dark",
}

export interface Theme {
  vars: { [key: string]: any };
  name: ThemeName;
}

export interface LayoutState {
  menus: Menu[];
  tabs: TabItem[];
  activeKey: string;
  theme: Theme;
}

const initialState: LayoutState = {
  menus: [],
  tabs: [{ title: "首页", path: "/dashboard", key: "dashboard" }],
  theme: { vars: {}, name: ThemeName.LIGHT },
  activeKey: "dashboard",
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    // 添加菜单树
    setMenuTree(state, action: PayloadAction<Menu[]>) {
      state.menus = action.payload;
    },
    // 添加标签页
    addTab(state, action: PayloadAction<TabItem>) {
      if (!state.tabs.find((i) => i.key === action.payload.key)) {
        state.tabs.push(action.payload);
      }
    },
    // 设置标签页
    setTabs(state, action: PayloadAction<TabItem[]>) {
      state.tabs = action.payload;
    },
    // 设置当前活跃tab key
    setActiveKey(state, action: PayloadAction<string>) {
      state.activeKey = action.payload;
    },
    // 删除标签页
    removeAllTabs(state) {
      state.tabs = state.tabs.filter((v, K) => K === 0);
    },
    // 删除右侧标签
    removeRightTabs(state, action: PayloadAction<string>) {
      const index = state.tabs.findIndex((v) => v.key === action.payload);
      state.tabs = state.tabs.filter((v, k) => k <= index);
    },
    // 删除其他标签
    removeOtherTabs(state, action: PayloadAction<string>) {
      state.tabs = state.tabs.filter(
        (v, K) => v.key === action.payload || K === 0
      );
    },
    // 删除全部标签页
    removeTab(state, action: PayloadAction<string>) {
      state.tabs = state.tabs.filter((v) => v.key !== action.payload);
    },
    // 设置主题
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
  },
});

export const {
  setMenuTree,
  addTab,
  setActiveKey,
  removeAllTabs,
  removeRightTabs,
  removeOtherTabs,
  removeTab,
  setTheme,
} = globalSlice.actions;

/**
 * 登录
 * @param payload
 */
export const getMenuTree = () => async (
  dispatch: Dispatch<ReturnType<typeof setMenuTree>>
) => {
  try {
    const menus = await apiSystemMenuGetTree();
    dispatch(setMenuTree(menus));
  } catch (error) {
    message.error("初始化菜单失败");
  }
};

export default globalSlice.reducer;
