import { GET_BOARD_INFO, ADD_LIST } from "../types";
const initialState = {};

function singleBoardReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOARD_INFO:
      return { ...action.payload };

    case ADD_LIST:
      state.lists = [...state.lists, action.payload];
      return state;
    default:
      return state;
  }
}

export default singleBoardReducer;
