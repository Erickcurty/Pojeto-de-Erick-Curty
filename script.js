document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const clearTasksBtn = document.getElementById('clearTasksBtn');
    const taskList = document.getElementById('taskList');

  
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.textContent = task.text;
            if (task.completed) {
                li.classList.add('completed');
            }
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Deletar';
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', () => deleteTask(index));
            li.appendChild(deleteButton);
            li.addEventListener('click', () => toggleCompleted(index));
            taskList.appendChild(li);
        });
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Por favor, insira uma tarefa.');
            return;
        }
        const newTask = { text: taskText, completed: false };
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        taskInput.value = '';
    }

    function toggleCompleted(index) {
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    addTaskBtn.addEventListener('click', addTask);
    clearTasksBtn.addEventListener('click', () => {
        if (confirm('Voce tem certeza que deseja apagar todas as tarefas?')) {
            localStorage.removeItem('tasks');
            tasks.length = 0;
            renderTasks();
        }
    });

    renderTasks();
});
