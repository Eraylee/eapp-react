import { Menu } from "@/api/apis/system";
import produce, { Draft } from "immer";
import { createReducer, ActionType } from "typesafe-actions";
import { setMenuTreeData, setFormValue } from "./action";
import * as actions from "./action";

export interface MenuState {
  menus: Menu[];
  formValue: Partial<Menu>;
}

const initFormValue: Partial<Menu> = {
  name: "",
  path: "",
  visiable : 1
};

export const initState: MenuState = {
  menus: [],
  formValue: initFormValue,
};

type MenuActionType = ActionType<typeof actions>;

export const menuReducer = createReducer<MenuState, MenuActionType>(initState)
  .handleAction(
    setMenuTreeData,
    produce(
      (
        state: Draft<MenuState>,
        actions: ActionType<typeof setMenuTreeData>
      ) => {
        state.menus = actions.payload;
      }
    )
  )
  .handleAction(
    setFormValue,
    produce(
      (state: Draft<MenuState>, actions: ActionType<typeof setFormValue>) => {
        state.formValue = actions.payload;
      }
    )
  );
