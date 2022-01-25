import * as actionTypes from "../utils/ActionTypes";
import { updateObject } from "../utils/utility";

const initialState = {
    users: [],
    error: null,
    loading: false
}

const fetchUsersStart = (state, action) => {
    return updateObject( state, { error: null, loading: true } );
}

const fetchUsersSuccess = (state, action) => {
    return updateObject( state, { 
        users: action.users,
        error: null,
        loading: false
     } );
}

const fetchUsersFail = (state, action) => {
    return updateObject( state, { 
        error: action.error,
        loading: false
     } );
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USERS_START:
            return fetchUsersStart(state, action);
        case actionTypes.FETCH_USERS_SUCCESS:
            return fetchUsersSuccess(state, action);
        case actionTypes.FETCH_USERS_FAIL:
            return fetchUsersFail(state, action);
        case actionTypes.UPDATE_USER:
            return updateObject( state, {posts: action.payload, error: null, loading: false});
        default: 
            return state;
    }
}