import * as actionTypes from "../utils/ActionTypes";
import { updateObject } from "../utils/utility";

const initialState = {
    token: null,
    userId: null,
    username: null,
    roles: [],
    error: null,
    loading: false,
};

const authStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const authSuccess = (state, action) => {
    return updateObject( state, { 
        token: action.token,
        userId: action.userId,
        roles: action.roles,
        username: action.username,
        error: null,
        loading: false
     } );
};

const authFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, { 
        token: null, 
        userId: null, 
        username: null, 
        roles: [] 
    });
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        default:
            return state;
    }
}