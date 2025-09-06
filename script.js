const form = document.getElementById('task-form');
const titleInput = document.getElementById('task-title');
const descInput = document.getElementById('task-desc');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task';
        if(task.completed) {
            li.classList.add('completed');
        }
        li.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <button onclick="toggleComplete(${index})">✔</button>
            <button onclick="deleteTask(${index})">✖</button>
        `;
        taskList.appendChild(li);
    });
}

function addTask(title, description) {
    tasks.push({
        title,
        description,
        completed: false
    });
    saveTasks();
    renderTasks();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    const description = descInput.value.trim();
    if(title) {
        addTask(title, description);
        titleInput.value = '';
        descInput.value = '';
    }
});

renderTasks();
