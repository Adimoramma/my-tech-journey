// src/pages/PostDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/posts/${id}`
                );

                if (!response.ok) {
                    throw new Error(`Post not found`);
                }

                const data = await response.json();
                setPost(data);
                setError(null);
            } catch (err) {
                setError(err.message);
                setPost(null);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) {
        return (
            <div>
                <h2>📡 Loading post {id}...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h2>❌ Error</h2>
                <p style={{ color: '#e74c3c' }}>{error}</p>
                <Link to="/posts">← Back to Posts</Link>
            </div>
        );
    }

    if (!post) {
        return (
            <div>
                <h2>❌ Post not found</h2>
                <Link to="/posts">← Back to Posts</Link>
            </div>
        );
    }

    return (
        <div>
            <Link to="/posts" style={styles.backLink}>← Back to Posts</Link>
            <h2 style={styles.title}>{post.title}</h2>
            <p style={styles.body}>{post.body}</p>
            <p style={styles.meta}>Post ID: {post.id} | User ID: {post.userId}</p>
        </div>
    );
}

const styles = {
    backLink: {
        color: '#61dafb',
        textDecoration: 'none',
        display: 'inline-block',
        marginBottom: '15px',
    },
    title: {
        color: '#61dafb',
        fontSize: '24px',
        marginBottom: '15px',
    },
    body: {
        color: '#e0e0e0',
        fontSize: '16px',
        lineHeight: '1.6',
        textAlign: 'left',
        maxWidth: '600px',
        margin: '0 auto',
    },
    meta: {
        color: '#7f8c8d',
        fontSize: '14px',
        marginTop: '20px',
    },
};

export default PostDetail;