import { combineReducers, createStore, applyMiddleware } from "redux";
import userInfoReducer from "./reducers/userInfo";
import thunk from "redux-thunk";

let rootReducer = combineReducers({
  userInfo: userInfoReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
