// Log the marked function to verify it's loaded correctly
console.log('Marked function:', marked); // This should log the function definition

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
        console.log('Task Title:', taskTitle); // Log the task title
        if (taskTitle) {
            const taskContainer = document.getElementById(column + '-tasks');
            if (!taskContainer) {
                console.error('Task container not found for column:', column);
                return;
            }
            const taskElement = document.createElement('div');
            taskElement.className = 'task';
            taskElement.innerHTML = marked(taskTitle); // Convert markdown to HTML

            // Add click event to edit the task
            taskElement.onclick = function() {
                openEditTaskPopup(taskElement);
            };

            taskContainer.appendChild(taskElement);
            console.log('Task added to container:', taskElement); // Log the added task
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

function openEditTaskPopup(taskElement) {
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

    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = 'white';
    modalContent.style.padding = '20px';
    modalContent.style.borderRadius = '5px';
    modalContent.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';

    const taskInput = document.createElement('textarea');
    taskInput.value = taskElement.innerText; // Set the current task text
    modalContent.appendChild(taskInput);

    const simplemde = new SimpleMDE({ element: taskInput });

    const saveButton = document.createElement('button');
    saveButton.innerText = 'Save Changes';
    saveButton.onclick = function() {
        const updatedTaskTitle = simplemde.value();
        if (updatedTaskTitle) {
            taskElement.innerHTML = marked(updatedTaskTitle); // Update the task with new content
            modal.remove();
        } else {
 console.warn('Updated task title is empty.'); // Warn if the updated task title is empty
        }
    };

    const closeButton = document.createElement('button');
    closeButton.innerText = 'Close';
    closeButton.onclick = function() {
        modal.remove(); // Close the modal
    };

    modalContent.appendChild(saveButton);
    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);
    
    document.body.appendChild(modal);
}