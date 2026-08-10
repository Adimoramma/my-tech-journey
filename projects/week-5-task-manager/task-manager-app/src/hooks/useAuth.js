// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { login, register } from '../api';

function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Check if user is already logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        if (token && savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const handleLogin = async (credentials) => {
        setError('');
        try {
            const data = await login(credentials);
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                setUser(data.user);
                return { success: true, user: data.user };
            } else {
                setError(data.message || 'Login failed');
                return { success: false, error: data.message || 'Login failed' };
            }
        } catch (err) {
            setError(err.message || 'Network error');
            return { success: false, error: err.message || 'Network error' };
        }
    };

    const handleRegister = async (userData) => {
        setError('');
        try {
            const data = await register(userData);
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                setUser(data.user);
                return { success: true, user: data.user };
            } else {
                setError(data.message || 'Registration failed');
                return { success: false, error: data.message || 'Registration failed' };
            }
        } catch (err) {
            setError(err.message || 'Network error');
            return { success: false, error: err.message || 'Network error' };
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return {
        user,
        loading,
        error,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        setError,
    };
}

export default useAuth;