import produce, { Draft } from "immer";
import { Menu } from "@/api/apis/system";
import { createReducer, ActionType } from "typesafe-actions";
import * as actions from "./action";
import {
  setMenuTree,
  setTabs,
  addTab,
  removeAllTabs,
  removeRightTabs,
  removeOtherTabs,
  removeTab,
  setTheme,
  setActiveKey,
} from "./action";

type LayoutActionType = ActionType<typeof actions>;

export interface TabItem {
  title: string;
  path: string;
  key: string;
}

export enum Locale {
  EN = "en_US",
  ZH = "zh_CN",
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
  locale: Locale;
}

const initState: LayoutState = {
  menus: [],
  tabs: [{ title: "首页", path: "/dashboard", key: "dashboard" }],
  theme: { vars: {}, name: ThemeName.LIGHT },
  activeKey: "dashboard",
  locale: Locale.ZH,
};

export const layoutReducer = createReducer<LayoutState, LayoutActionType>(
  initState
)
  .handleAction(
    setMenuTree,
    produce(
      (state: Draft<LayoutState>, actions: ActionType<typeof setMenuTree>) => {
        state.menus = actions.payload;
      }
    )
  )
  .handleAction(
    addTab,
    produce((state: Draft<LayoutState>, actions: ActionType<typeof addTab>) => {
      if (!state.tabs.find((i) => i.key === actions.payload.key)) {
        state.tabs.push(actions.payload);
      }
    })
  )
  .handleAction(
    setTabs,
    produce(
      (state: Draft<LayoutState>, actions: ActionType<typeof setTabs>) => {
        state.tabs = actions.payload;
      }
    )
  )
  .handleAction(
    setActiveKey,
    produce(
      (state: Draft<LayoutState>, actions: ActionType<typeof setActiveKey>) => {
        state.activeKey = actions.payload;
      }
    )
  )
  .handleAction(
    removeAllTabs,
    produce((state: Draft<LayoutState>) => {
      state.tabs = state.tabs.filter((v, K) => K === 0);
    })
  )
  .handleAction(
    removeRightTabs,
    produce(
      (
        state: Draft<LayoutState>,
        actions: ActionType<typeof removeRightTabs>
      ) => {
        const index = state.tabs.findIndex((v) => v.key === actions.payload);
        state.tabs = state.tabs.filter((v, k) => k <= index);
      }
    )
  )
  .handleAction(
    removeOtherTabs,
    produce(
      (
        state: Draft<LayoutState>,
        actions: ActionType<typeof removeOtherTabs>
      ) => {
        state.tabs = state.tabs.filter(
          (v, K) => v.key === actions.payload || K === 0
        );
      }
    )
  )
  .handleAction(
    removeTab,
    produce(
      (state: Draft<LayoutState>, actions: ActionType<typeof removeTab>) => {
        state.tabs = state.tabs.filter((v) => v.key !== actions.payload);
      }
    )
  )
  .handleAction(
    setTheme,
    produce(
      (state: Draft<LayoutState>, actions: ActionType<typeof setTheme>) => {
        state.theme = actions.payload;
      }
    )
  );
