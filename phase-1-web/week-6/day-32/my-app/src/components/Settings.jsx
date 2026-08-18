// src/components/Settings.jsx
import useLocalStorage from '../hooks/useLocalStorage';
import useToggle from '../hooks/useToggle';
import { useTheme } from '../context/ThemeContext';

function Settings() {
    const { theme, toggleTheme, isDark } = useTheme();
    const [username, setUsername, removeUsername] = useLocalStorage('username', '');
    
    // ✅ CORRECT usage of useToggle
    const { value: notifications, toggle: toggleNotifications } = useToggle(true);
    const { value: autoSave, toggle: toggleAutoSave } = useToggle(true);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    return (
        <div style={{
            backgroundColor: isDark ? '#1e2636' : '#f0f4f8',
            padding: '20px',
            borderRadius: '8px',
            border: `2px solid ${isDark ? '#61dafb' : '#3498db'}`,
            transition: 'all 0.3s',
            marginTop: '20px'
        }}>
            <h2 style={{ color: isDark ? '#61dafb' : '#2c3e50' }}>⚙️ Settings</h2>

            <div style={styles.settingItem}>
                <label style={styles.label}>
                    <strong>Username:</strong>
                    <input
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                        placeholder="Enter username"
                        style={{
                            ...styles.input,
                            backgroundColor: isDark ? '#282c34' : 'white',
                            color: isDark ? '#e0e0e0' : '#333',
                            borderColor: isDark ? '#3a4050' : '#ddd'
                        }}
                    />
                </label>
                {username && (
                    <button
                        onClick={removeUsername}
                        style={{
                            ...styles.button,
                            backgroundColor: '#e74c3c',
                            color: 'white'
                        }}
                    >
                        Clear Username
                    </button>
                )}
                <p style={{ color: isDark ? '#7f8c8d' : '#666' }}>
                    {username ? `👤 Welcome, ${username}!` : 'No username set'}
                </p>
            </div>

            <div style={styles.settingItem}>
                <label style={styles.label}>
                    <strong>Notifications:</strong>
                    <button
                        onClick={toggleNotifications}
                        style={{
                            ...styles.toggleButton,
                            backgroundColor: notifications ? '#2ecc71' : '#e74c3c',
                            color: 'white',
                            marginLeft: '10px'
                        }}
                    >
                        {notifications ? '✅ ON' : '❌ OFF'}
                    </button>
                </label>
            </div>

            <div style={styles.settingItem}>
                <label style={styles.label}>
                    <strong>Auto-Save:</strong>
                    <button
                        onClick={toggleAutoSave}
                        style={{
                            ...styles.toggleButton,
                            backgroundColor: autoSave ? '#2ecc71' : '#e74c3c',
                            color: 'white',
                            marginLeft: '10px'
                        }}
                    >
                        {autoSave ? '✅ ON' : '❌ OFF'}
                    </button>
                </label>
            </div>

            <div style={styles.settingItem}>
                <label style={styles.label}>
                    <strong>Theme:</strong>
                    <button
                        onClick={toggleTheme}
                        style={{
                            ...styles.toggleButton,
                            backgroundColor: isDark ? '#61dafb' : '#282c34',
                            color: isDark ? '#282c34' : '#61dafb',
                            marginLeft: '10px'
                        }}
                    >
                        {isDark ? '☀️ Light' : '🌙 Dark'}
                    </button>
                </label>
            </div>
        </div>
    );
}

const styles = {
    settingItem: {
        margin: '15px 0',
        padding: '10px',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '5px'
    },
    label: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '10px'
    },
    input: {
        padding: '8px 12px',
        borderRadius: '4px',
        border: '2px solid #ddd',
        fontSize: '14px',
        flex: '1',
        minWidth: '150px',
        transition: 'all 0.3s'
    },
    button: {
        padding: '8px 16px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'all 0.3s'
    },
    toggleButton: {
        padding: '6px 16px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
        transition: 'all 0.3s'
    }
};

export default Settings;