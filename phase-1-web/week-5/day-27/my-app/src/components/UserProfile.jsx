// src/components/UserProfile.jsx
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/users/${userId}`
                );

                if (!response.ok) {
                    throw new Error(`User not found`);
                }

                const data = await response.json();
                setUser(data);
                setError(null);
            } catch (err) {
                setError(err.message);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]); // Re-run when userId changes

    if (loading) {
        return (
            <div style={styles.container}>
                <p>Loading user {userId}...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={styles.container}>
                <p style={{ color: '#e74c3c' }}>❌ {error}</p>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div style={styles.container}>
            <h3>👤 {user.name}</h3>
            <p>📧 {user.email}</p>
            <p>📞 {user.phone}</p>
            <p>🏢 {user.company?.name || 'N/A'}</p>
        </div>
    );
}

const styles = {
    container: {
        backgroundColor: '#282c34',
        padding: '15px',
        borderRadius: '8px',
        margin: '10px 0',
        border: '1px solid #3a4050',
        textAlign: 'left',
    },
};

export default UserProfile;