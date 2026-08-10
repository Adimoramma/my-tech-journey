// src/App.jsx
import { useState } from 'react';
import './App.css';
import useAuth from './hooks/useAuth';
import useTasks from './hooks/useTasks';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Navbar from './components/Navbar';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
    const [showRegister, setShowRegister] = useState(false);
    const [serverError, setServerError] = useState('');

    const { user, loading: authLoading, login, register, logout } = useAuth();
    const { tasks, loading: tasksLoading, addTask, toggleComplete, removeTask } = useTasks();

    const handleLogin = async (credentials) => {
        const result = await login(credentials);
        if (result.success) {
            setServerError('');
        }
        return result;
    };

    const handleRegister = async (userData) => {
        const result = await register(userData);
        if (result.success) {
            setServerError('');
            setShowRegister(false);
        }
        return result;
    };

    const handleLogout = () => {
        logout();
        setShowRegister(false);
    };

    // Show loading state
    if (authLoading) {
        return (
            <div className="App">
                <LoadingSpinner message="Loading..." />
            </div>
        );
    }

    // Show login/register if not authenticated
    if (!user) {
        return (
            <div className="App">
                <div style={styles.authContainer}>
                    {showRegister ? (
                        <RegisterForm
                            onRegister={handleRegister}
                            switchToLogin={() => setShowRegister(false)}
                            serverError={serverError}
                            setServerError={setServerError}
                        />
                    ) : (
                        <LoginForm
                            onLogin={handleLogin}
                            switchToRegister={() => setShowRegister(true)}
                            serverError={serverError}
                            setServerError={setServerError}
                        />
                    )}
                </div>
            </div>
        );
    }

    // Show task manager if authenticated
    return (
        <div className="App">
            <div style={styles.container}>
                <Navbar user={user} onLogout={handleLogout} />

                <TaskForm onAddTask={addTask} />

                {tasksLoading ? (
                    <LoadingSpinner message="Loading tasks..." />
                ) : (
                    <TaskList
                        tasks={tasks}
                        onToggleComplete={toggleComplete}
                        onDeleteTask={removeTask}
                    />
                )}
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
};

export default App;