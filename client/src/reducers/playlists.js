import * as actionTypes from "../utils/ActionTypes";
import { updateObject } from "../utils/utility";

const initialState = {
    playlists: [],
    error: null,
    loading: false
}

const fetchPlaylistsStart = (state, action) => {
    return updateObject( state, { error: null, loading: true } );
}

const fetchPlaylistsSuccess = (state, action) => {
    return updateObject( state, { 
        playlists: action.playlists,
        error: null,
        loading: false
     } );
}

const fetchPlaylistsFail = (state, action) => {
    return updateObject( state, { 
        error: action.error,
        loading: false
     } );
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PLAYLISTS_START:
            return fetchPlaylistsStart(state, action);
        case actionTypes.FETCH_PLAYLISTS_SUCCESS:
            return fetchPlaylistsSuccess(state, action);
        case actionTypes.FETCH_PLAYLISTS_FAIL:
            return fetchPlaylistsFail(state, action);
        default: 
            return state;
    }
}