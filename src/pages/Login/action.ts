import { LoginReq } from "@/api/types";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { apiAuthLlogin } from "@/api/system";
export const LOGIN = "LOGIN";
export const ADD_USER = "ADD_USER";

export interface AddUser extends Action<typeof ADD_USER> {
  payload: string;
}

export const addUser = (payload: string): AddUser => ({
  type: ADD_USER,
  payload,
});

export const login = (
  payload: LoginReq
): ThunkAction<Promise<boolean>, null, null, AddUser> => async (dispatch) => {
  const token = await apiAuthLlogin(payload);
  if (token) {
    dispatch(addUser(token));
    return true;
  }
  return false;
};

export type LoginActions = AddUser;
