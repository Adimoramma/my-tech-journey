// src/components/ThemeToggle.jsx
import { useTheme } from '../context/ThemeContext';

function ThemeToggle() {
    const { theme, toggleTheme, isDark } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            style={{
                padding: '10px 20px',
                backgroundColor: isDark ? '#61dafb' : '#282c34',
                color: isDark ? '#282c34' : '#61dafb',
                border: '2px solid #61dafb',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
                transition: 'all 0.3s',
                marginTop: '10px'
            }}
        >
            {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
    );
}

export default ThemeToggle;