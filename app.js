
let editTask = null;

function addTask(task, priority) {
    const taskList = document.getElementById('taskList');
    
    const li = document.createElement('li');
    const span = document.createElement('span');
    const okButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    const editButton = document.createElement('button');
    
    span.textContent = `${task} (Prioridad: ${priority})`;
    okButton.textContent = '✓';
    okButton.className = 'ok';
    deleteButton.textContent = 'Eliminar';
    deleteButton.className = 'delete';
    editButton.textContent = 'Editar';
    editButton.className = 'edit';
    
    okButton.addEventListener('click', function() {
        li.classList.toggle('completed');
    });
    
    deleteButton.addEventListener('click', function() {
        li.remove();
    });

    editButton.addEventListener('click', function() {
        taskInput.value = task;
        priorityInput.value = priority;
        editTask = li;
    });
    
    li.dataset.priority = priority;
    
    li.appendChild(span);
    li.appendChild(okButton);
    li.appendChild(deleteButton);
    li.appendChild(editButton);
    
    taskList.appendChild(li);
}

function reordenarTareas() {
    const taskList = document.getElementById('taskList');
    const tasks = Array.from(taskList.children);
    
    tasks.sort((a, b) => a.dataset.priority - b.dataset.priority);
    
    taskList.innerHTML = '';
    tasks.forEach(task => taskList.appendChild(task));
}

document.getElementById('todoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const taskInput = document.getElementById('taskInput');
    const priorityInput = document.getElementById('priorityInput');
    const task = taskInput.value.trim();
    const priority = parseInt(priorityInput.value, 10);
    
    if (task !== '' && !isNaN(priority) && priority >= 1 && priority <= 5) {
        if (editTask) {
            const span = editTask.querySelector('span');
            span.textContent = `${task} (Prioridad: ${priority})`;
            editTask.dataset.priority = priority;
            editTask = null; 
        } else {
            addTask(task, priority);
        }
        taskInput.value = '';
        priorityInput.value = '';
    } else {
        alert('Por favor, ingrese una tarea válida y una prioridad entre 1 y 5.');
    }
});

document.getElementById('sortButton').addEventListener('click', function() {
    reordenarTareas();
});
