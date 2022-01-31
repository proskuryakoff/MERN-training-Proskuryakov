import { combineReducers } from "redux";

import posts from './posts'
import auth from './auth'
import users from './users'
import playlists from './playlists'

export default combineReducers({
    posts,
    auth,
    users,
    playlists
})