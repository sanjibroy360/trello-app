import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import userInfoReducer from "./reducers/userInfo";
import teamBoardsReducer from "./reducers/teamBoards";
import personalBoardsReducer from "./reducers/personalBoards";
import thunk from "redux-thunk";
import teamsReducer from "./reducers/teams";
import singleBoardReducer from "./reducers/singleBoard";
import singleTeamReducer from "./reducers/singleTeam";
import allListReducer from "./reducers/allLists";
import commentReducer from "./reducers/comments";
import singleCardReducer from "./reducers/singleCard"

let rootReducer = combineReducers({
  userInfo: userInfoReducer,
  teamBoards: teamBoardsReducer,
  personalBoards: personalBoardsReducer,
  teams: teamsReducer,
  singleBoard: singleBoardReducer,
  singleTeam: singleTeamReducer,
  allList: allListReducer,
  comments: commentReducer,
  singleCard: singleCardReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
