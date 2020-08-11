import { User } from "@/api/apis/system";
import produce, { Draft } from "immer";
import { createReducer, ActionType } from "typesafe-actions";
import { setUser, clearUser } from "./action";
import * as actions from "./action";

export interface LoginState {
  user: Partial<User>;
}

type LoginActionType = ActionType<typeof actions>;

const initState: LoginState = {
  user: {},
};

export const loginReducer = createReducer<LoginState, LoginActionType>(
  initState
)
  .handleAction(
    setUser,
    produce((state: Draft<LoginState>, actions: ActionType<typeof setUser>) => {
      state.user = actions.payload;
    })
  )
  .handleAction(
    clearUser,
    produce((state: Draft<LoginState>) => {
      state.user = initState.user;
    })
  );
