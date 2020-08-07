import { LayoutActions, ADD_MENU_TREE, ADD_TAB, REMOVE_TAB } from "./action";
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
  tabs: [{ title: "首页", path: "/dashboard", key: "1" }],
  currentTabIndex: 0,
};

export const layoutReducer = produce(
  (state: Draft<LayoutState>, actions: LayoutActions) => {
    switch (actions.type) {
      case ADD_MENU_TREE:
        state.menus = actions.payload;
        break;
      case ADD_TAB:
        if (!state.tabs.find((v) => v.key === actions.payload.key)) {
          state.tabs.push(actions.payload);
        }
        break;
      case REMOVE_TAB:
        state.tabs = state.tabs.filter((v) => v.key !== actions.payload);
        break;
      default:
        break;
    }
  },
  initState
);
