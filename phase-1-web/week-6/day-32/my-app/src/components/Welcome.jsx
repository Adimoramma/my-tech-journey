// src/components/Welcome.jsx
import { useTheme } from '../context/ThemeContext';

function Welcome({ name, age }) {
    const { isDark } = useTheme();

    const styles = {
        container: {
            border: `2px solid ${isDark ? '#61dafb' : '#3498db'}`,
            borderRadius: '8px',
            padding: '20px',
            margin: '10px',
            backgroundColor: isDark ? '#1e2636' : '#f0f4f8',
            color: isDark ? '#e0e0e0' : '#333',
            transition: 'all 0.3s'
        },
        title: {
            color: isDark ? '#61dafb' : '#2c3e50'
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Hello, {name}! 👋</h2>
            <p>Welcome to React, {name}!</p>
            {age && <p>You are {age} years old.</p>}
        </div>
    );
}

export default Welcome;