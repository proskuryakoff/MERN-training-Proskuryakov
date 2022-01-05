import * as api from '../api'
import { FETCH_ALL, CREATE } from "../utils/ActionTypes";

//Action Creators
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        dispatch({ type: FETCH_ALL, payload: data})
    } catch (err) {
        console.log(err.message)
    }
}

export const createPost = (post, navigate) => async (dispatch) => {
    try{
        const { data } = await api.createPost(post);
        dispatch({type: CREATE, payload: {data, post}})
        navigate('/')
    } catch (err) {
        console.log(err.message)
    }
}