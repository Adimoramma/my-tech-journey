// src/api.js
import axios from 'axios';

// API Base URL
const API_URL = 'http://localhost:3000';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if it exists
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Auth APIs
export const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
};

export const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
};

// Task APIs (authenticated)
export const getTasks = async () => {
    const response = await api.get('/tasks');
    return response.data;
};

export const createTask = async (title) => {
    const response = await api.post('/tasks', { title });
    return response.data;
};

export const updateTask = async (id, updates) => {
    const response = await api.put(`/tasks/${id}`, updates);
    return response.data;
};

export const deleteTask = async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
};

export default api;