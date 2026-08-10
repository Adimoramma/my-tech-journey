// src/hooks/useTasks.js
import { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../api';

function useTasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const data = await getTasks();
            if (data.tasks) {
                setTasks(data.tasks);
            } else {
                setTasks([]);
            }
            setError('');
        } catch (err) {
            setError('Failed to load tasks. Please try again.');
            setTasks([]);
        } finally {
            setLoading(false);
        }
    };

    const addTask = async (title) => {
        try {
            const data = await createTask(title);
            if (data.task) {
                setTasks([data.task, ...tasks]);
                return { success: true, task: data.task };
            }
            return { success: false, error: 'Failed to add task' };
        } catch (err) {
            return { success: false, error: err.message || 'Failed to add task' };
        }
    };

    const toggleComplete = async (id, completed) => {
        try {
            const data = await updateTask(id, { completed });
            if (data.task) {
                setTasks(tasks.map(task =>
                    task._id === id ? data.task : task
                ));
                return { success: true, task: data.task };
            }
            return { success: false, error: 'Failed to update task' };
        } catch (err) {
            return { success: false, error: err.message || 'Failed to update task' };
        }
    };

    const removeTask = async (id) => {
        try {
            await deleteTask(id);
            setTasks(tasks.filter(task => task._id !== id));
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message || 'Failed to delete task' };
        }
    };

    useEffect(() => {
        // Only fetch if user is logged in (token exists)
        const token = localStorage.getItem('token');
        if (token) {
            fetchTasks();
        } else {
            setLoading(false);
        }
    }, []);

    return {
        tasks,
        loading,
        error,
        fetchTasks,
        addTask,
        toggleComplete,
        removeTask,
        setError,
    };
}

export default useTasks;