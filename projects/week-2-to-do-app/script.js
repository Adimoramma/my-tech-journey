// =========================================
// DAY 12: WEEKLY PROJECT - To-Do List App
// =========================================

// ===== STATE =====
let tasks = [];
let currentFilter = 'all';
let nextId = 1;

// ===== DOM REFERENCES =====
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const filterBtns = document.querySelectorAll('.filter-btn');

// ===== FUNCTIONS =====

// Render tasks based on current filter
function render() {
    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'active') return !task.completed;
        if (currentFilter === 'completed') return task.completed;
        return true; // 'all'
    });

    // Clear the list
    taskList.innerHTML = '';

    if (filteredTasks.length === 0) {
        taskList.innerHTML = `<li class="empty-message">No tasks here! 🎯</li>`;
    } else {
        filteredTasks.forEach(task => {
            const li = document.createElement('li');

            // Checkbox
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', () => toggleComplete(task.id));

            // Task text
            const span = document.createElement('span');
            span.className = 'task-text' + (task.completed ? ' completed' : '');
            span.textContent = task.text;

            // Delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => deleteTask(task.id));

            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    }

    // Update task count
    const remaining = tasks.filter(t => !t.completed).length;
    taskCount.textContent = `${remaining} task${remaining !== 1 ? 's' : ''} remaining`;
}

// Add a new task
function addTask() {
    const text = taskInput.value.trim();
    if (text === '') {
        taskInput.style.borderColor = '#e74c3c';
        setTimeout(() => taskInput.style.borderColor = '#ddd', 1500);
        return;
    }

    tasks.push({
        id: nextId++,
        text: text,
        completed: false
    });

    taskInput.value = '';
    taskInput.focus();
    render();
}

// Delete a task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    render();
}

// Toggle complete status
function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        render();
    }
}

// Set filter
function setFilter(filter) {
    currentFilter = filter;
    filterBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    render();
}

// ===== EVENT LISTENERS =====

// Add button
addBtn.addEventListener('click', addTask);

// Enter key on input
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// Filter buttons
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        setFilter(btn.dataset.filter);
    });
});

// ===== INITIAL RENDER =====
render();

// Log to console
console.log('To-Do List app loaded! 🚀');
console.log('Try adding tasks, checking them off, and using filters.');