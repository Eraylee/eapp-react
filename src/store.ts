import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { loginReducer } from "./pages/Login/reducer";

const rootReducer = combineReducers({
  loginReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
