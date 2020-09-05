import { GET_TEAM_INFO, UPDATE_TEAM_MEMBER_LIST } from "../types";
const initialState = {};

function singleTeamReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TEAM_INFO:
      return { ...action.payload };

    case UPDATE_TEAM_MEMBER_LIST:
      return { ...state, members: [...action.payload.members] };
    default:
      return state;
  }
}

export default singleTeamReducer;
