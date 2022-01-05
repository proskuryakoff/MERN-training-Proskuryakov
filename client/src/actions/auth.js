import * as api from '../api/index'
import { AUTH, LOGOUT } from '../utils/ActionTypes';

export const login = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.login(formData);
        dispatch({ type: AUTH, data })
        navigate('/')
    } catch (err){
        console.log(err)
    }
};

export const register = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.register(formData);
        navigate('/')
    } catch (err){
        console.log(err)
    }
};

export const logout = (navigate) => async (dispatch) => {
    try {
        dispatch({ type: LOGOUT})
        navigate('/')
    } catch (err){
        console.log(err)
    }
}

