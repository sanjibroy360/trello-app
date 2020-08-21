import { combineReducers, createStore, applyMiddleware } from "redux";
import userInfoReducer from "./reducers/userInfo";
import boardsReducer from "./reducers/boards";
import thunk from "redux-thunk";
import teamsReducer from "./reducers/teams";
import singleBoardReducer from "./reducers/singleBoard";
import singleTeamReducer from "./reducers/singleTeam";

let rootReducer = combineReducers({
  userInfo: userInfoReducer,
  boards: boardsReducer,
  teams: teamsReducer,
  singleBoard: singleBoardReducer,
  singleTeam: singleTeamReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
