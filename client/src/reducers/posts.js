import * as actionTypes from "../utils/ActionTypes";
import { updateObject } from "../utils/utility";

const initialState = {
    posts: [],
    error: null,
    loading: false
}

const fetchStart = (state, action) => {
    return updateObject( state, { error: null, loading: true } );
}

const fetchSuccess = (state, action) => {
    return updateObject( state, { 
        posts: action.posts,
        error: null,
        loading: false
     } );
}

const fetchFail = (state, action) => {
    return updateObject( state, { 
        error: action.error,
        loading: false
     } );
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_START:
            return fetchStart(state, action);
        case actionTypes.FETCH_SUCCESS:
            return fetchSuccess(state, action);
        case actionTypes.FETCH_FAIL:
            return fetchFail(state, action);
        case actionTypes.CREATE_POST: 
            return [...state, action.payload.post];
        case actionTypes.UPDATE_POST:
            return updateObject( state, {posts: action.payload, error: null, loading: false});
        case actionTypes.LIKE_POST: 
            return updateObject( state, {posts: action.payload, error: null, loading: false});
        case actionTypes.COMMENT_POST: 
            return updateObject( state, {posts: action.payload, error: null, loading: false});
        default: 
            return state;
    }
}