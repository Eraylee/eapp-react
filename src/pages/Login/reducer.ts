import { User } from "@/api/types";
import produce from "immer";
import { LoginActions, ADD_USER, CLEAR_USER } from "./action";

export interface LoginState extends Partial<User> {}

const initLoginState: LoginState = {
  id: 0,
  phone: "",
  username: "",
  nickname: "",
  email: "",
  avatar: "",
  roles: [],
};

export const loginReducer = produce(
  (state = initLoginState, actions: LoginActions) => {
    switch (actions.type) {
      case ADD_USER:
        state = actions.payload;
        break;
      case CLEAR_USER:
        state = initLoginState;
        break;
      default:
        break;
    }
  },
  {}
);
