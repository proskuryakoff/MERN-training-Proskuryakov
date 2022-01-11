import { authApi } from '../api/index'

import * as actionTypes from '../utils/ActionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId, roles, username) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId, 
        roles: roles,
        username: username
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
    localStorage.removeItem("roles");
    localStorage.removeItem("username");
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (form, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {...form};
        let url = '/auth/register';
        if (!isSignup) {
            url = '/auth/login';
        }
        authApi(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("expirationDate", expirationDate);
                localStorage.setItem("userId", response.data.userId);
                localStorage.setItem("roles", JSON.stringify(response.data.roles));
                localStorage.setItem("username", response.data.username);
                dispatch(authSuccess(response.data.token, response.data.userId, response.data.roles, response.data.username));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            });

    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                const roles = JSON.parse(localStorage.getItem('roles'));
                const username = localStorage.getItem('username');
                dispatch(authSuccess(token, userId, roles, username));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};