import { LayoutActions, ADD_MENU_TREE } from "./action";
import { Menu } from "@/api/types";

export interface LayoutState {
  menus: Menu[];
}

const iniState: LayoutState = {
  menus: [],
};

export const layoutReducer = (
  state = iniState,
  actions: LayoutActions
): LayoutState => {
  switch (actions.type) {
    case ADD_MENU_TREE:
      return Object.assign({}, state, { menus: actions.payload });
    default:
      return state;
  }
};
