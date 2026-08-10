// src/context/ThemeContext.jsx
import { createContext, useState, useContext } from 'react';

// 1. Create the Context
const ThemeContext = createContext();

// 2. Create the Provider component
export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    // Value that will be available to all consumers
    const value = {
        theme,
        toggleTheme,
        isDark: theme === 'dark',
        isLight: theme === 'light'
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

// 3. Create a custom hook for consuming the context
export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}