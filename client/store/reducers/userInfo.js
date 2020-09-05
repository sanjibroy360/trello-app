import { GET_USER_INFO, LOG_OUT } from "../types";
let initialState = {};

function userInfoReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_INFO:
      return action.payload;
    case LOG_OUT: 
      return {};
    default:
      return state;
  }
}

export default userInfoReducer;
