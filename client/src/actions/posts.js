import * as api from '../api'
import * as actionTypes from "../utils/ActionTypes";

//Action Creators

export const fetchStart = () => {
    return {
        type: actionTypes.FETCH_START
    };
};

export const fetchSuccess = (posts) => {
    return {
        type: actionTypes.FETCH_SUCCESS,
        posts: posts
    };
};
export const fetchFail = (error) => {
    return {
        type: actionTypes.FETCH_FAIL,
        error: error
    };
};


export const getPosts = () => async (dispatch) => {
    try {
        dispatch(fetchStart())
        const { data } = await api.fetchPosts();
        dispatch(fetchSuccess(data))
    } catch (err) {
        console.log(err.message)
        dispatch(fetchFail(err))
    }
}

export const createPost = (post, navigate, headers) => async (dispatch) => {
    try{
        const { data } = await api.createPost(post, headers);
        dispatch({type: actionTypes.CREATE, payload: {data, post}})
        // navigate('/')
    } catch (err) {
        console.log(err.message)
    }
}

export const getContent = (url) => async (dispatch) => {
    try{
        dispatch(fetchStart())
        const { data } = await api.fetchContent(url);
        dispatch(fetchSuccess(data))
    } catch (err) {
        console.log(err.message)
        dispatch(fetchFail(err))
    }
}