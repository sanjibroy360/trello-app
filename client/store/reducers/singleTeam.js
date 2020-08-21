import { GET_TEAM_INFO } from "../types";
const initialState = {};

function singleTeamReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TEAM_INFO:
      return action.payload;
    default:
      return state;
  }
}

export default singleTeamReducer;
