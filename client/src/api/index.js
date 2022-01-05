import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:4000' })

export const fetchPosts = () => API.get('/');
export const createPost = (newPost) => API.post('/', newPost);

export const login = (formData) => API.post('/auth/login', formData)
export const register = (formData) => API.post('/auth/register', formData)