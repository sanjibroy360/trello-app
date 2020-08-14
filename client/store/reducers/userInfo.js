import {GET_USER_INFO} from "../types"
let initialState = {};

function userInfoReducer(state = initialState, action) {
    switch(action.type) {
        case GET_USER_INFO: return action.payload
        default: return state;
    }
}

export default userInfoReducer;