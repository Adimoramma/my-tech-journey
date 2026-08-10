// src/components/Navbar.jsx
function Navbar({ user, onLogout }) {
    return (
        <nav style={styles.navbar}>
            <div style={styles.brand}>
                <h1>📝 Task Manager</h1>
            </div>
            <div style={styles.userSection}>
                <span style={styles.username}>👤 {user?.name}</span>
                <button onClick={onLogout} style={styles.logoutButton}>
                    Logout
                </button>
            </div>
        </nav>
    );
}

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 20px',
        backgroundColor: '#1a1e2e',
        borderBottom: '2px solid #61dafb',
        marginBottom: '20px',
        borderRadius: '8px 8px 0 0',
    },
    brand: {
        color: '#61dafb',
        fontSize: '14px',
    },
    userSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
    },
    username: {
        color: '#e0e0e0',
        fontSize: '16px',
    },
    logoutButton: {
        padding: '8px 16px',
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
    },
};

export default Navbar;