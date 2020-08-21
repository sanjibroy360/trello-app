import { GET_BOARD_LIST } from "../types";
const initialState = {};

function boardsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOARD_LIST:
      return action.payload;
    default:
      return state;
  }
}

export default boardsReducer;
