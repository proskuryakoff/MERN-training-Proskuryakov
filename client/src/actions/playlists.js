import * as api from '../api'
import * as actionTypes from "../utils/ActionTypes";

export const fetchPlaylistsStart = () => {
    return {
        type: actionTypes.FETCH_PLAYLISTS_START
    };
};

export const fetchPlaylistsSuccess = (playlists) => {
    return {
        type: actionTypes.FETCH_PLAYLISTS_SUCCESS,
        playlists: playlists
    };
};
export const fetchPlaylistsFail = (error) => {
    return {
        type: actionTypes.FETCH_PLAYLISTS_FAIL,
        error: error
    };
};

export const getPlaylists = (headers) => async (dispatch) => {
    try {
        dispatch(fetchPlaylistsStart())
        const { data } = await api.getPlaylists(headers);
        dispatch(fetchPlaylistsSuccess(data))
    } catch (err) {
        console.log(err.message)
        dispatch(fetchPlaylistsFail(err))
    }
}

export const deletePlaylist = (url, headers, navigate) => async (dispatch) => {
    try{
        await api.deletePlaylist(url, headers);
    } catch (err) {
        console.log(err.message)
    }
    navigate("/", { replace: true })
}