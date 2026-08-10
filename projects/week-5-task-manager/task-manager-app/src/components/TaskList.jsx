// src/components/TaskList.jsx
function TaskList({ tasks, onToggleComplete, onDeleteTask }) {
    if (tasks.length === 0) {
        return (
            <div style={styles.empty}>
                <p>🎉 No tasks yet! Add one above.</p>
            </div>
        );
    }

    return (
        <ul style={styles.list}>
            {tasks.map((task) => (
                <li key={task._id} style={styles.taskItem}>
                    <div style={styles.taskContent}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => onToggleComplete(task._id, !task.completed)}
                            style={styles.checkbox}
                        />
                        <span
                            style={{
                                ...styles.taskText,
                                textDecoration: task.completed ? 'line-through' : 'none',
                                color: task.completed ? '#7f8c8d' : '#e0e0e0',
                            }}
                        >
                            {task.title}
                        </span>
                    </div>
                    <button
                        onClick={() => onDeleteTask(task._id)}
                        style={styles.deleteButton}
                    >
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    );
}

const styles = {
    list: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
    },
    taskItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 15px',
        backgroundColor: '#282c34',
        borderRadius: '4px',
        marginBottom: '8px',
        border: '1px solid #3a4050',
    },
    taskContent: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flex: 1,
    },
    checkbox: {
        width: '18px',
        height: '18px',
        cursor: 'pointer',
    },
    taskText: {
        fontSize: '16px',
        wordBreak: 'break-word',
    },
    deleteButton: {
        padding: '6px 14px',
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
    },
    empty: {
        textAlign: 'center',
        padding: '40px 0',
        color: '#7f8c8d',
        fontSize: '18px',
    },
};

export default TaskList;