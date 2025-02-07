function openAddTaskPopup(column) {
    console.log('openAddTaskPopup called for column:', column);
    
    // Create a modal for adding a task
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';

    // Create the content of the modal
    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = 'white';
    modalContent.style.padding = '20px';
    modalContent.style.borderRadius = '5px';
    modalContent.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';

    // Create input for task title using SimpleMDE
    const taskInput = document.createElement('textarea');
    taskInput.placeholder = 'Enter your task here...';
    modalContent.appendChild(taskInput);

    // Initialize SimpleMDE
    const simplemde = new SimpleMDE({ element: taskInput });

    // Create button to add task
    const addButton = document.createElement('button');
    addButton.innerText = 'Add Task';
    addButton.onclick = function() {
        const taskTitle = simplemde.value(); // Get the value from SimpleMDE
        if (taskTitle) {
            console.log('Task Title:', taskTitle);
            const taskContainer = document.getElementById(column + '-tasks');
            if (!taskContainer) {
                console.error('Task container not found for column:', column);
                return;
            }
            const taskElement = document.createElement('div');
            taskElement.className = 'task';
            taskElement.innerHTML = marked(taskTitle); // Convert markdown to HTML
            taskContainer.appendChild(taskElement);
            modal.remove(); // Close the modal after adding the task
        } else {
            console.warn('Task title is empty.'); // Warn if the task title is empty
        }
    };

    // Create button to close modal
    const closeButton = document.createElement('button');
    closeButton.innerText = 'Close';
    closeButton.onclick = function() {
        modal.remove(); // Close the modal
    };

    // Append elements to modal content
    modalContent.appendChild(addButton);
    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);
    
    // Append modal to body
    document.body.appendChild(modal);
}

function saveMarkdown() {
    const tasks = [];
    document.querySelectorAll('.task').forEach(task => {
        tasks.push(task.innerText); // Get the text of each task
    });
    const markdown = tasks.join('\n'); // Join tasks with new lines
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tasks.md';
    a.click();
    URL.revokeObjectURL(url);
}

function loadMarkdown() {
    const fileInput = document.getElementBy Id('fileInput');
    fileInput.click();
}

function readFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const markdown = e.target.result;
        const tasks = markdown.split('\n');
        tasks.forEach(task => {
            if (task) {
                const taskContainer = document.getElementById('backlog-tasks'); // Default to backlog
                const taskElement = document.createElement('div');
                taskElement.className = 'task';
                taskElement.innerHTML = marked(task); // Convert markdown to HTML
                taskContainer.appendChild(taskElement); // Corrected from task Container to taskContainer
            }
        });
    };
    reader.readAsText(file);
}