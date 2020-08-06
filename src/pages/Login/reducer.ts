import { User } from "@/api/types";
import { LoginActions, ADD_USER, CLEAR_USER } from "./action";

export interface LoginState extends Partial<User> {
  token: string;
}

const initLoginState: LoginState = {
  id: 0,
  phone: "",
  username: "",
  nickname: "",
  email: "",
  token: "",
  avatar: "",
  roles: [],
};

export const loginReducer = (
  state = initLoginState,
  actions: LoginActions
): LoginState => {
  switch (actions.type) {
    case ADD_USER:
      return Object.assign({}, state, actions.payload);
    case CLEAR_USER:
      return initLoginState;
    default:
      return state;
  }
};
