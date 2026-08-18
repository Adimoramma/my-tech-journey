// src/hooks/useLocalStorage.jsx
import { useState, useEffect } from 'react';

// Custom hook for persisting state in localStorage
function useLocalStorage(key, initialValue) {
    // Get stored value from localStorage
    const readStoredValue = () => {
        if (typeof window === 'undefined') {
            return initialValue;
        }
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    };

    // State to store our value
    const [storedValue, setStoredValue] = useState(readStoredValue);

    // Save to localStorage whenever storedValue changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                window.localStorage.setItem(key, JSON.stringify(storedValue));
            } catch (error) {
                console.warn(`Error setting localStorage key "${key}":`, error);
            }
        }
    }, [key, storedValue]);

    // Function to remove the item from localStorage
    const removeItem = () => {
        if (typeof window !== 'undefined') {
            try {
                window.localStorage.removeItem(key);
                setStoredValue(initialValue);
            } catch (error) {
                console.warn(`Error removing localStorage key "${key}":`, error);
            }
        }
    };

    return [storedValue, setStoredValue, removeItem];
}

export default useLocalStorage;