import {
  ADD_COMMENT,
  GET_ALL_COMMENTS,
  EDIT_COMMENT,
  DELETE_COMMENT,
} from "../types";

let initialState = [];

function commentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_COMMENTS:
      return [...action.payload];
    case ADD_COMMENT:
      return [...state, action.payload];

    case EDIT_COMMENT:
      state = state.map((comment) => {
        if (comment._id == action.payload._id) {
          return action.payload;
        }
        return comment;
      });
      return state;

    case DELETE_COMMENT:
      return state.filter((comment) => comment._id != action.payload._id);
    default:
      return state;
  }
}

export default commentReducer;
