import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { loginReducer } from "../pages/Login/reducer";
import { layoutReducer } from "../pages/Layout/reducer";
import { menuReducer } from "../pages/System/Menu/reducer";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  loginReducer,
  layoutReducer,
  menuReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type AppState = ReturnType<typeof rootReducer>;
