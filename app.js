document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const clearCompletedButton = document.getElementById('clear-completed');
    const toggleAllButton = document.getElementById('toggle-all');

    let todos = [];

    todoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const todoText = todoInput.value.trim();
        if (todoText !== '') {
            addTodoItem(todoText);
            todoInput.value = '';
        }
    });

    todoList.addEventListener('click', function(event) {
        const target = event.target;
        if (target.classList.contains('delete-button')) {
            const index = target.parentElement.dataset.index;
            deleteTodoItem(index);
        } else if (target.tagName === 'INPUT' && target.type === 'checkbox') {
            const index = target.parentElement.dataset.index;
            toggleTodoComplete(index);
        }
    });

    clearCompletedButton.addEventListener('click', function() {
        todos = todos.filter(todo => !todo.completed);
        renderTodoList();
    });

    toggleAllButton.addEventListener('click', function() {
        const allComplete = todos.every(todo => todo.completed);
        todos.forEach(todo => todo.completed = !allComplete);
        renderTodoList();
    });

    function addTodoItem(text) {
        const todo = {
            text: text,
            completed: false
        };
        todos.push(todo);
        renderTodoList();
    }

    function deleteTodoItem(index) {
        todos.splice(index, 1);
        renderTodoList();
    }

    function toggleTodoComplete(index) {
        todos[index].completed = !todos[index].completed;
        renderTodoList();
    }

    function renderTodoList() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.dataset.index = index;
            if (todo.completed) {
                li.classList.add('completed');
            }
            li.innerHTML = `
                <input type="checkbox" ${todo.completed ? 'checked' : ''}>
                <span>${todo.text}</span>
                <button class="delete-button">Delete</button>
            `;
            todoList.appendChild(li);
        });
    }
});
