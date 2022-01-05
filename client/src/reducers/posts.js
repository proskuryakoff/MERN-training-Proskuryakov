import { FETCH_ALL, CREATE } from "../utils/ActionTypes";

export default (posts = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE: 
            return [...posts, action.payload.post];
        default: 
            return posts;
    }
}