// src/pages/Posts.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Posts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    'https://jsonplaceholder.typicode.com/posts?_limit=10'
                );

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
    }, []);

    if (loading) {
        return (
            <div>
                <h2>📡 Loading posts...</h2>
                <div>⏳</div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h2>❌ Error</h2>
                <p style={{ color: '#e74c3c' }}>{error}</p>
            </div>
        );
    }

    return (
        <div>
            <h2>📝 Posts from API</h2>
            <p>Showing {posts.length} posts</p>
            <div style={styles.postsList}>
                {posts.map((post) => (
                    <div key={post.id} style={styles.postCard}>
                        <h3 style={styles.postTitle}>
                            <Link to={`/posts/${post.id}`} style={styles.link}>
                                {post.id}. {post.title}
                            </Link>
                        </h3>
                        <p style={styles.postBody}>{post.body}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

const styles = {
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
    link: {
        color: '#61dafb',
        textDecoration: 'none',
    },
};

export default Posts;