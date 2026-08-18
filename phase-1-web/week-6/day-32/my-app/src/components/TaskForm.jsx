// src/components/TaskForm.jsx
import { useState } from 'react';

function TaskForm({ onAddTask }) {
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmedTitle = title.trim();

        // Validate
        if (!trimmedTitle) {
            setError('Task title is required');
            return;
        }

        if (trimmedTitle.length < 3) {
            setError('Task title must be at least 3 characters');
            return;
        }

        setError('');
        setIsSubmitting(true);

        try {
            await onAddTask(trimmedTitle);
            setTitle('');
        } catch (err) {
            setError('Failed to add task. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputWrapper}>
                <input
                    type="text"
                    placeholder="Enter a new task..."
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        if (error) setError('');
                    }}
                    style={{
                        ...styles.input,
                        borderColor: error ? '#e74c3c' : '#3a4050'
                    }}
                    disabled={isSubmitting}
                />
                {error && <p style={styles.error}>{error}</p>}
            </div>
            <button
                type="submit"
                style={styles.button}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Adding...' : 'Add Task'}
            </button>
        </form>
    );
}

const styles = {
    form: {
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
        alignItems: 'flex-start',
    },
    inputWrapper: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    input: {
        padding: '12px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '2px solid #3a4050',
        backgroundColor: '#282c34',
        color: 'white',
        width: '100%',
        transition: 'border-color 0.2s',
    },
    error: {
        color: '#e74c3c',
        fontSize: '14px',
        margin: '0',
        textAlign: 'left',
    },
    button: {
        padding: '12px 24px',
        fontSize: '16px',
        backgroundColor: '#61dafb',
        color: '#282c34',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
    },
};

export default TaskForm;