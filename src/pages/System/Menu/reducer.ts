import { Menu } from "@/api/types";
import produce, { Draft } from "immer";
import { menuActions, SET_MENU_TREE } from "./action";

export interface MenuState {
  menus: Menu[];
}

const initState: MenuState = {
  menus: [],
};

export const menuReducer = produce(
  (state: Draft<MenuState>, actions: menuActions) => {
    switch (actions.type) {
      case SET_MENU_TREE:
        state.menus = actions.payload;
        break;
      default:
        break;
    }
  },
  initState
);
