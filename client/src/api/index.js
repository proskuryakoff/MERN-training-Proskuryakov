import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:4000' })

export const fetchPosts = () => API.get('/');
export const fetchPostsBySearch = (searchQuery) => API.get('/search?searchQuery=' + searchQuery);
export const fetchContent = (url) => API.get(url);
export const createPost = (newPost, headers) => API.post('/', newPost, {
    headers: headers
});
export const updatePost = (url, updatedPost, headers) => API.put(url, updatedPost, {
    headers: headers
});
export const deletePost = (url, headers) => API.delete(url, {
    headers: headers
});
export const likePost = (url, headers) => API.post(url, {}, {
    headers: headers
});
export const leaveComment = (url, comment, headers) => API.post(url, comment, {
    headers: headers
});
export const incrementViews = (url) => API.post(url);

export const authApi = (url, formData) => API.post(url, formData)

export const getUsers = (headers) => API.get('/auth/users', {
    headers: headers
});
export const updateUser = (url, updatedUser, headers) => API.put(url, updatedUser, {
    headers: headers
});
export const deleteUser = (url, headers) => API.delete(url, {
    headers: headers
});
export const getPlaylists = (headers) => API.get('/playlists', {
    headers: headers
});