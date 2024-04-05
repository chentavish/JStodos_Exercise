document.addEventListener("DOMContentLoaded", function() {
    let todoForm = document.getElementById("todoForm");
    let todoList = document.getElementById("todoList");

    // Load todo list from local storage if available
    loadTodosFromLocalStorage();

    todoForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const taskInput = document.getElementById("task").value.trim();
        if (taskInput === '') {
            alert("Text box is Empty! Please add your task!");
        } else {
            addTaskToList(taskInput);
            saveTodoToLocalStorage(taskInput);
            todoForm.reset();
        }
    });

    todoList.addEventListener("click", function(event) {
        if (event.target.tagName.toLowerCase() === "button") {
            let taskText = event.target.parentNode.firstChild.textContent;
            removeTask(event.target.parentNode);
            removeTaskFromLocalStorage(taskText);
        }
    });

    function addTaskToList(task) {
        let newTodo = document.createElement("li");
        newTodo.innerText = task;

        // Add event listener to toggle strikethrough style
        newTodo.addEventListener("click", function() {
        if (newTodo.style.textDecoration === "line-through") {
            newTodo.style.textDecoration = "none";
        } else {
            newTodo.style.textDecoration = "line-through";
        }
        });
        
        let removeButton = document.createElement("button");
        removeButton.innerText = "Remove";
        newTodo.appendChild(removeButton);
        todoList.appendChild(newTodo);
    }

    function removeTask(taskElement) {
        taskElement.remove();
    }

    function saveTodoToLocalStorage(task) {
        let todos = JSON.parse(localStorage.getItem("todos")) || [];
        todos.push(task);
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    function loadTodosFromLocalStorage() {
        let todos = JSON.parse(localStorage.getItem("todos")) || [];
        todos.forEach(todo => {
            addTaskToList(todo);
        });
    }

    function removeTaskFromLocalStorage(task) {
        let todos = JSON.parse(localStorage.getItem("todos")) || [];
        let index = todos.indexOf(task);
        if (index !== -1) {
            todos.splice(index, 1);
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    }
});
