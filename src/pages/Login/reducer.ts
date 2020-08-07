import { User } from "@/api/types";
import produce, { Draft } from "immer";
import { LoginActions, ADD_USER, CLEAR_USER } from "./action";

export interface LoginState {
  user: Partial<User>;
}

const initLoginState: LoginState = {
  user: {
    id: 0,
    phone: "",
    username: "",
    nickname: "",
    email: "",
    avatar: "",
    roles: [],
  },
};

export const loginReducer = produce(
  (state: Draft<LoginState>, actions: LoginActions) => {
    switch (actions.type) {
      case ADD_USER:
        state.user = actions.payload;
        break;
      case CLEAR_USER:
        state = initLoginState;
        break;
      default:
        break;
    }
  },
  initLoginState
);
