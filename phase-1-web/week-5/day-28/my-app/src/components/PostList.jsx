// src/components/PostList.jsx
import { useState, useEffect } from 'react';

function PostList() {
    // State for data, loading, and errors
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect runs when the component mounts
    useEffect(() => {
        // Define an async function inside useEffect
        const fetchPosts = async () => {
            try {
                setLoading(true);
                // Fetch data from a free API (JSONPlaceholder)
                const response = await fetch(
                    'https://jsonplaceholder.typicode.com/posts?_limit=5'
                );

                // Check if response is OK (status 200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setPosts(data);
                setError(null);
            } catch (err) {
                setError(err.message);
                setPosts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []); // Empty array = run once on mount

    // Show loading state
    if (loading) {
        return (
            <div style={styles.container}>
                <h2>📡 Loading posts...</h2>
                <div style={styles.loader}>⏳</div>
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div style={styles.container}>
                <h2>❌ Error</h2>
                <p style={{ color: '#e74c3c' }}>{error}</p>
                <button onClick={() => window.location.reload()} style={styles.button}>
                    Try Again
                </button>
            </div>
        );
    }

    // Show posts
    return (
        <div style={styles.container}>
            <h2>📝 Posts from API</h2>
            <p>Showing {posts.length} posts</p>
            <div style={styles.postsList}>
                {posts.map((post) => (
                    <div key={post.id} style={styles.postCard}>
                        <h3 style={styles.postTitle}>
                            {post.id}. {post.title}
                        </h3>
                        <p style={styles.postBody}>{post.body}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Inline styles
const styles = {
    container: {
        border: '2px solid #61dafb',
        borderRadius: '8px',
        padding: '20px',
        margin: '10px',
        backgroundColor: '#1e2636',
        maxWidth: '600px',
        width: '100%',
    },
    postsList: {
        textAlign: 'left',
        marginTop: '10px',
    },
    postCard: {
        backgroundColor: '#282c34',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '10px',
        border: '1px solid #3a4050',
    },
    postTitle: {
        color: '#61dafb',
        fontSize: '16px',
        marginBottom: '5px',
    },
    postBody: {
        color: '#b0b0b0',
        fontSize: '14px',
        lineHeight: '1.5',
    },
    loader: {
        fontSize: '48px',
        animation: 'spin 1s linear infinite',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#61dafb',
        color: '#282c34',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        marginTop: '10px',
    },
};

export default PostList;