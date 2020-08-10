import {
  LayoutActions,
  SET_MENU_TREE,
  ADD_TAB,
  REMOVE_TAB,
  SET_CURRENT_TAB_INDEX,
  REMOVE_RIGHT_TABS,
  REMOVE_OTHER_TABS,
  REMOVE_All_TABS,
  SET_TABS,
} from "./action";
import produce, { Draft } from "immer";
import { Menu } from "@/api/types";

export interface TabItem {
  title: string;
  path: string;
  key: string;
}

export interface LayoutState {
  menus: Menu[];
  tabs: TabItem[];
  currentTabIndex: number;
}

const initState: LayoutState = {
  menus: [],
  tabs: [{ title: "首页", path: "/dashboard", key: "dashboard" }],
  currentTabIndex: 0,
};

export const layoutReducer = produce(
  (state: Draft<LayoutState>, actions: LayoutActions) => {
    switch (actions.type) {
      case SET_MENU_TREE:
        state.menus = actions.payload;
        break;
      case ADD_TAB:
        if (!state.tabs.find((v) => v.key === actions.payload.key)) {
          state.tabs.push(actions.payload);
        }
        break;
      case SET_TABS:
        state.tabs = actions.payload;
        break;
      case REMOVE_TAB:
        state.tabs = state.tabs.filter((v) => v.key !== actions.payload);
        break;
      case REMOVE_RIGHT_TABS:
        const index = state.tabs.findIndex((v) => v.key === actions.payload);
        state.tabs = state.tabs.filter((v, k) => k <= index);
        break;
      case REMOVE_OTHER_TABS:
        state.tabs = state.tabs.filter(
          (v, K) => v.key === actions.payload || K === 0
        );
        break;
      case REMOVE_All_TABS:
        state.tabs = state.tabs.filter((v, K) => K === 0);
        break;
      case SET_CURRENT_TAB_INDEX:
        state.currentTabIndex = actions.payload;
        break;
      default:
        break;
    }
  },
  initState
);
