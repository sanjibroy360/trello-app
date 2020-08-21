import { GET_BOARD_INFO } from "../types";
const initialState = {};

function singleBoardReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOARD_INFO:
      return action.payload;
    default:
      return state;
  }
}

export default singleBoardReducer;
