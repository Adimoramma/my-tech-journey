// src/components/ThemedCard.jsx
import { useTheme } from '../context/ThemeContext';

function ThemedCard({ title, children }) {
    const { isDark } = useTheme();

    const styles = {
        container: {
            backgroundColor: isDark ? '#1e2636' : '#f0f4f8',
            color: isDark ? '#e0e0e0' : '#333',
            border: `2px solid ${isDark ? '#61dafb' : '#3498db'}`,
            borderRadius: '8px',
            padding: '20px',
            margin: '10px 0',
            transition: 'all 0.3s',
            boxShadow: isDark
                ? '0 4px 15px rgba(0,0,0,0.3)'
                : '0 4px 15px rgba(0,0,0,0.1)'
        },
        title: {
            color: isDark ? '#61dafb' : '#2c3e50',
            marginBottom: '10px',
            fontSize: '20px'
        }
    };

    return (
        <div style={styles.container}>
            <h3 style={styles.title}>{title}</h3>
            <div>{children}</div>
        </div>
    );
}

export default ThemedCard;