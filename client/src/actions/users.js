import * as api from '../api'
import * as actionTypes from "../utils/ActionTypes";

export const fetchUsersStart = () => {
    return {
        type: actionTypes.FETCH_USERS_START
    };
};

export const fetchUsersSuccess = (users) => {
    return {
        type: actionTypes.FETCH_USERS_SUCCESS,
        users: users
    };
};
export const fetchUsersFail = (error) => {
    return {
        type: actionTypes.FETCH_USERS_FAIL,
        error: error
    };
};

export const getUsers = (headers) => async (dispatch) => {
    try {
        dispatch(fetchUsersStart())
        const { data } = await api.getUsers(headers);
        dispatch(fetchUsersSuccess(data))
    } catch (err) {
        console.log(err.message)
        dispatch(fetchUsersFail(err))
    }
}