import { LayoutActions, ADD_MENU_TREE } from "./action";
import produce, { Draft } from "immer";
import { Menu } from "@/api/types";

export interface LayoutState {
  menus: Menu[];
}

const initState: LayoutState = {
  menus: [],
};

export const layoutReducer = produce(
  (state: Draft<LayoutState>, actions: LayoutActions) => {
    switch (actions.type) {
      case ADD_MENU_TREE:
        state.menus = actions.payload;
        break;
      default:
        break;
    }
  },
  initState
);
