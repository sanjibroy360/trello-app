import {
  ADD_LIST_TO_ALL_LIST,
  GET_ALL_LIST,
  ADD_CARD,
  UPDATE_LIST_INFO,
  REORDER_SAME_LIST_CARDS,
  DRAG_AND_DROP_BETWEEN_TWO_LIST,
  EDIT_CARD_INFO,
  DELETE_ALL_CARDS_IN_THE_LIST,
  DELETE_LIST,
  DELETE_CARD,
  FALLBACK,
} from "../types";

let initialState = [];

function allListReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_LIST:
      return [...action.payload];

    case UPDATE_LIST_INFO:
      let id = action.payload._id;
      console.log(action.payload, id);
      state = state.map((list) => {
        if (list._id == id) {
          return action.payload;
        }
        return list;
      });
      return [...state];

    case ADD_LIST_TO_ALL_LIST:
      return [...state, action.payload];

    case ADD_CARD:
      let listId = action.payload.listId;
      state = state.map((list) => {
        if (list._id == listId) {
          list.cards.push(action.payload);
        }
        return list;
      });
      return [...state];

    case REORDER_SAME_LIST_CARDS:
      state = state.map((list) => {
        if (list._id == action.payload._id) {
          return action.payload;
        }
        return list;
      });
      return [...state];

    case FALLBACK:
      return [...action.payload];

    case DRAG_AND_DROP_BETWEEN_TWO_LIST: {
      let { sourceList, destList } = action.payload;
      state = state.map((list) => {
        if (list._id == sourceList._id) {
          return sourceList;
        } else if (list._id == destList._id) {
          return destList;
        }
        return list;
      });
      return state;
    }

    case EDIT_CARD_INFO:
      listId = action.payload.listId._id;
      let listIndex = state.findIndex((list) => list._id == listId);
      state[listIndex].cards = state[listIndex].cards.map((card) => {
        if (card._id == action.payload._id) {
          return action.payload;
        }
        return card;
      });

      console.log({ cards: state[listIndex].cards });

      return [...state];

    case DELETE_ALL_CARDS_IN_THE_LIST:
      state = state.map((list) => {
        if (action.payload._id == list._id) {
          list.cards = [];
        }
        return list;
      });
      return state;

    case DELETE_LIST:
      state = state.filter((list) => list._id != action.payload._id);
      return state;

    case DELETE_CARD:
      state = state.filter((list) => {
        list.cards = list.cards.filter(
          (card) => card._id != action.payload._id
        );
        return list;
      });
      return state;
    default:
      return state;
  }
}

export default allListReducer;
