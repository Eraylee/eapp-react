import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
import loginReducer from "../pages/Login/store";
import globalReducer from "../pages/Layout/store";
import menuReducer from "../pages/System/Menu/store";
import userReducer from "../pages/System/User/store";
import roleReducer from "../pages/System/Role/store";
import dataDictionarySlice from "../pages/System/DataDictionary/store";
// import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  loginReducer,
  globalReducer,
  menuReducer,
  userReducer,
  roleReducer,
  dataDictionarySlice,
});

// export const store = configureStore (rootReducer);

export type AppState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});
