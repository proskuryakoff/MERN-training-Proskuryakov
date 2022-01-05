import { AUTH, LOGOUT } from "../utils/ActionTypes";

const storageName = 'userData';

export default (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem(storageName, JSON.stringify({...action?.data }))
            return { ...state, authData: action?.data };
        case LOGOUT: 
            localStorage.removeItem(storageName)
            return { ...state, authData: null };
        default: 
            return state;
    }
}