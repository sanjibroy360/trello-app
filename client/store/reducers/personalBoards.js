import { GET_ALL_PERSONAL_BOARDS, ADD_PERSONAL_BOARD } from "../types";
const initialState = [];

function personalBoardsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PERSONAL_BOARDS:
      return [...action.payload];

    case ADD_PERSONAL_BOARD:
      return [...state, action.payload];
    default:
      return state;
  }
}

export default personalBoardsReducer;
