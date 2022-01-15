import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:4000' })

export const fetchPosts = () => API.get('/');
export const fetchContent = (url) => API.get(url);
export const createPost = (newPost, headers) => API.post('/', newPost, {
    headers: headers
});
export const updatePost = (url, updatedPost, headers) => API.put(url, updatedPost, {
    headers: headers
});
export const deletePost = (url, headers) => API.delete(url, {}, {
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