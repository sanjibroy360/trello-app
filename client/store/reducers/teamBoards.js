import { GET_ALL_TEAM_BOARDS, ADD_TEAM_BOARD } from "../types";
const initialState = [];

function teamBoardsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_TEAM_BOARDS:
      return [...action.payload];

    case ADD_TEAM_BOARD:
      return [...state, action.payload];

    default:
      return state;
  }
}

export default teamBoardsReducer;
