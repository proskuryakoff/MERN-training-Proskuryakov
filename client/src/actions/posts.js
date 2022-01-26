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

export const createPost = (post, headers, navigate) => async (dispatch) => {
    try{
        const { data } = await api.createPost(post, headers);
        dispatch({type: actionTypes.CREATE_POST, payload: {data, post}})
    } catch (err) {
        console.log(err.message)
    }
    navigate("/", { replace: true })
}
export const editPost = (url, post, headers) => async (dispatch) => {
    try{
        const { data } = await api.updatePost(url, post, headers);
        dispatch({type: actionTypes.UPDATE_POST, payload: data})
    } catch (err) {
        console.log(err.message)
    }
}
export const deletePost = (url, headers, navigate) => async (dispatch) => {
    try{
        await api.deletePost(url, headers);
    } catch (err) {
        console.log(err.message)
    }
    navigate("/", { replace: true })
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
export const loadVideo = (url) => async (dispatch) => {
    try{
       await api.fetchContent(url);
    } catch (err) {
        console.log(err.message)
        dispatch(fetchFail(err))
    }
}

export const likePost = (id, headers) => async (dispatch) => {
    try{
        const url = '/content/' + id + '/like'
        const { data } = await api.likePost(url, headers);
        dispatch({ type: actionTypes.LIKE_POST, payload: data });
    } catch (err) {
        console.log(err.message)
        dispatch(fetchFail(err))
    }
}
export const leaveComment = (id, comment, headers) => async (dispatch) => {
    try{
        const url = '/content/' + id + '/comment'
        const { data } = await api.leaveComment(url, comment, headers);
        dispatch({ type: actionTypes.COMMENT_POST, payload: data });
    } catch (err) {
        console.log(err.message)
        dispatch(fetchFail(err))
    }
}
export const incrementViews = (url) => async (dispatch) => {
    try{
       await api.incrementViews(url);
    } catch (err) {
        console.log(err.message)
        dispatch(fetchFail(err))
    }
}