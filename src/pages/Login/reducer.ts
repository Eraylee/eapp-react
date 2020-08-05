import { User } from "@/api/types";
import { LoginActions, ADD_USER } from "./action";

export interface LoginState extends User {
  token: string;
}

const loginState: LoginState = {
  id: 0,
  phone: "",
  username: "",
  nickname: "",
  email: "",
  token: "",
  avatar: "",
};

export const loginReducer = (
  state = loginState,
  actions: LoginActions
): LoginState => {
  switch (actions.type) {
    case ADD_USER:
      const token = actions.payload;
      return Object.assign({}, state, { token });
    default:
      return state;
  }
};
