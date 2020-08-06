import { LayoutActions, ADD_MENU_TREE } from "./action";
import produce from "immer";
import { Menu } from "@/api/types";

export interface LayoutState {
  menus: Menu[];
}

const iniState: LayoutState = {
  menus: [],
};

export const layoutReducer = produce(
  (state = iniState, actions: LayoutActions) => {
    switch (actions.type) {
      case ADD_MENU_TREE:
        state.menus = actions.payload;
        break;
      default:
        break;
    }
  },
  {}
);
