import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:4000' })

export const fetchPosts = () => API.get('/');
export const createPost = (newPost) => API.post('/', newPost);

export const authApi = (url, formData) => API.post(url, formData)