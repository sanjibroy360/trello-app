import {GET_TEAM_LIST} from "../types";
const initialState = [];

function teamsReducer(state = initialState, action) {
    switch(action.type) {
        case GET_TEAM_LIST: return action.payload
        default: return state;
    }
}

export default teamsReducer;