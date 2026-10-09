const PORT = 8080;
const API_URL = `http://localhost:${PORT}/tasks`;

const taskList = document.getElementById('taskList');

async function loadTasks() {
    console.log('Trying to connect to:', API_URL);

    const response = await fetch(API_URL);
    const tasks = await response.json();

    taskList.innerHTML='';

    tasks.forEach(task => {
        const li = document.createElement('li');

        li.textContent = task.title;

        taskList.appendChild(li);
        
    });
   
}

const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');

taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const taskName = taskInput.value;

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: taskName})
        });

        const newTask = await response.json();

        console.log('New task created:', newTask);

        taskInput.value = '';

        loadTasks();

    });
