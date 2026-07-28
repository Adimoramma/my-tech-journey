// src/App.jsx
import { useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import TaskForm from './components/TaskForm';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Learn React', completed: false },
        { id: 2, title: 'Build a form', completed: false },
    ]);

    const handleLogin = (userData) => {
        setUser(userData);
        setIsLoggedIn(true);
    };

    const handleRegister = (userData) => {
        setUser(userData);
        setIsLoggedIn(true);
        setShowRegister(false);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser(null);
    };

    const handleAddTask = (title) => {
        const newTask = {
            id: Date.now(),
            title: title,
            completed: false
        };
        setTasks([newTask, ...tasks]);
    };

    // If not logged in, show login/register
    if (!isLoggedIn) {
        return (
            <div className="App">
                <div style={styles.authContainer}>
                    {showRegister ? (
                        <RegisterForm
                            onRegister={handleRegister}
                            switchToLogin={() => setShowRegister(false)}
                        />
                    ) : (
                        <LoginForm
                            onLogin={handleLogin}
                            switchToRegister={() => setShowRegister(true)}
                        />
                    )}
                </div>
            </div>
        );
    }

    // If logged in, show task manager
    return (
        <div className="App">
            <div style={styles.container}>
                <div style={styles.header}>
                    <h1>📝 Task Manager</h1>
                    <div style={styles.userSection}>
                        <span style={styles.username}>👤 {user?.name}</span>
                        <button onClick={handleLogout} style={styles.logoutButton}>
                            Logout
                        </button>
                    </div>
                </div>

                <TaskForm onAddTask={handleAddTask} />

                <div style={styles.taskCount}>
                    {tasks.length} task{tasks.length !== 1 ? 's' : ''} total
                </div>

                <ul style={styles.taskList}>
                    {tasks.map((task) => (
                        <li key={task.id} style={styles.taskItem}>
                            <span
                                style={{
                                    ...styles.taskText,
                                    textDecoration: task.completed ? 'line-through' : 'none',
                                    color: task.completed ? '#7f8c8d' : '#e0e0e0',
                                }}
                            >
                                {task.title}
                            </span>
                            <span style={styles.taskId}>#{task.id}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

const styles = {
    authContainer: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        width: '100%',
    },
    container: {
        maxWidth: '700px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#1e2636',
        borderRadius: '8px',
        border: '2px solid #61dafb',
        minHeight: '400px',
        width: '100%',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        paddingBottom: '15px',
        borderBottom: '2px solid #3a4050',
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
    taskCount: {
        textAlign: 'center',
        color: '#7f8c8d',
        marginBottom: '15px',
        fontSize: '14px',
    },
    taskList: {
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
    taskText: {
        fontSize: '16px',
        wordBreak: 'break-word',
    },
    taskId: {
        color: '#7f8c8d',
        fontSize: '14px',
    },
};

export default App;