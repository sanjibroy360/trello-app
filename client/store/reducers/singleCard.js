import { GET_CURRENTLY_OPEN_CARD, UPDATE_CURRENT_CARD_INFO } from "../types";

let initialState = {};

function singleCardReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENTLY_OPEN_CARD:
      return { ...action.payload };

    case UPDATE_CURRENT_CARD_INFO:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}

export default singleCardReducer;
