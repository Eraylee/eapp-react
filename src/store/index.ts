import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
import loginReducer from "../pages/Login/store";
import globalReducer from "../pages/Layout/store";
import menuReducer from "../pages/System/Menu/store";
// import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  loginReducer,
  globalReducer,
  menuReducer,
});

// export const store = configureStore (rootReducer);

export type AppState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});
