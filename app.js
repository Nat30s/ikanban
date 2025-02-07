function openAddTaskPopup(column) {
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
    
    // Create input for task title
    const taskInput = document.createElement('textarea');
    taskInput.placeholder = 'Enter your task here...';
    taskInput.style.width = '100%';
    taskInput.style.height = '100px';
    taskInput.style.marginBottom = '10px';

    // Create a toolbar for markdown formatting
    const toolbar = document.createElement('div');
    toolbar.style.display = 'flex';
    toolbar.style.justifyContent = 'space-between';
    toolbar.style.marginBottom = '10px';

    // Create buttons for markdown formatting
    const boldButton = document.createElement('button');
    boldButton.innerText = 'Bold';
    boldButton.onclick = function() {
        taskInput.value += '**Bold Text**'; // Example markdown for bold
    };

    const italicButton = document.createElement('button');
    italicButton.innerText = 'Italic';
    italicButton.onclick = function() {
        taskInput.value += '*Italic Text*'; // Example markdown for italic
    };

    const strikethroughButton = document.createElement('button');
    strikethroughButton.innerText = 'Strikethrough';
    strikethroughButton.onclick = function() {
        taskInput.value += '~~Strikethrough~~'; // Example markdown for strikethrough
    };

    const headingButton = document.createElement('button');
    headingButton.innerText = 'Heading';
    headingButton.onclick = function() {
        taskInput.value += '# Heading'; // Example markdown for heading
    };

    // Append buttons to the toolbar
    toolbar.appendChild(boldButton);
    toolbar.appendChild(italicButton);
    toolbar.appendChild(strikethroughButton);
    toolbar.appendChild(headingButton);

    // Append toolbar and input to modal content
    modalContent.appendChild(toolbar);
    
    // Create button to add task
    const addButton = document.createElement('button');
    addButton.innerText = 'Add Task';
    addButton.onclick = function() {
        const taskTitle = taskInput.value;
        if (taskTitle) {
            // Logic to add the task to the specified column
            const taskContainer = document.getElementById(column + '-tasks');
            const taskElement = document.createElement('div');
            taskElement.className = 'task';
            taskElement.innerHTML = marked(taskTitle); // Convert markdown to HTML
            taskContainer.appendChild(taskElement);
            modal.remove(); // Close the modal after adding the task
        }
    };

    // Create button to close modal
    const closeButton = document.createElement('button');
    closeButton.innerText = 'Close';
    closeButton.onclick = function() {
        modal.remove(); // Close the modal
    };

    // Append elements to modal content
    modalContent.appendChild(taskInput);
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
    const fileInput = document.getElementById('fileInput');
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
                taskContainer.appendChild(taskElement);
            }
        });
    };
    reader.readAsText(file);
}
