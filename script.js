// Get references to HTML elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Event listener for adding a new task
addTaskBtn.addEventListener('click', addTask);


// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        // Add delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', deleteTask);
        taskItem.appendChild(deleteButton);

        // Add edit button
        const editButton = document.createElement('button');
        editButton.textContent = '✏️';
        editButton.classList.add('edit-btn');
        editButton.addEventListener('click', editTask);
        taskItem.appendChild(editButton);

        taskList.appendChild(taskItem);
        taskInput.value = '';
        saveTasks();
    } else {
        alert('Please enter a place!');
    }
}

// Function to delete a task
function deleteTask(event) {
    const taskItem = event.target.parentElement;
    taskList.removeChild(taskItem);
    saveTasks();
}

// Function to edit a task
function editTask(event) {
    const taskItem = event.target.parentElement;
    const newText = prompt('Edit Place:', taskItem.textContent.trim());
    if (newText !== null) {
        taskItem.textContent = newText.trim();

        // Re-add delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', deleteTask);
        taskItem.appendChild(deleteButton);

        // Re-add edit button
        const editButton = document.createElement('button');
        editButton.textContent = '✏️';
        editButton.classList.add('edit-btn');
        editButton.addEventListener('click', editTask);
        taskItem.appendChild(editButton);

        saveTasks();
    }
}

// Function to save tasks to local storage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(task => {
        tasks.push(task.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskText => {
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        // Add delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', deleteTask);
        taskItem.appendChild(deleteButton);

        // Add edit button
        const editButton = document.createElement('button');
        editButton.textContent = '✏️';
        editButton.classList.add('edit-btn');
        editButton.addEventListener('click', editTask);
        taskItem.appendChild(editButton);

        taskList.appendChild(taskItem);
    });
}

// Load tasks when the page is loaded
loadTasks();

