import './css/styles.css';

const todoForm = document.querySelector('form');
const currentTodos = document.querySelector('.current-todos');
const finishedTodos = document.querySelector('.finished-todos');
const userTodo = document.querySelector('#todo');

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const createTodo = document.createElement('div');
    let userTodoInput = userTodo.value;
    let todos;

    if (!userTodoInput) {
        console.log('Nothing there....');
    } else {
        createTodo.textContent = userTodoInput;
        createTodo.classList.add('todo-item');
        currentTodos.append(createTodo);
        if (localStorage.getItem('todos') === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem('todos'));
        }

        todos.push(userTodoInput);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
});

document.addEventListener('DOMContentLoaded', () => {
    loadItems();
});

const loadItems = () => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    todos.forEach((todo) => {
        const div = document.createElement('div');
        div.className = 'todo-item done';
        div.setAttribute('data-finished-item', 'true');
        div.textContent = todo;
        finishedTodos.append(div);
    });
};

userTodo.addEventListener('focus', () => {
    userTodo.value = '';
});

document.addEventListener('click', (e) => {
    if (e.target.className === 'todo-item') {
        if (currentTodos.children.length > 0) {
            e.target.classList.add('done');
            e.target.setAttribute('data-finished-item', 'true');
            finishedTodos.append(e.target);
        }
    }
});

document.addEventListener('dblclick', (e) => {
    let todos;
    if (e.target.hasAttribute('data-finished-item')) {
        if (e.target.classList.contains('done')) {
            finishedTodos.removeChild(e.target);
            document.querySelector('.message').classList.remove('hidden');
            if (localStorage.getItem('todos') === null) {
                todos = [];
            } else {
                todos = JSON.parse(localStorage.getItem('todos'));
            }
            todos.forEach((todo, index) => {
                if (e.target.textContent === todo) {
                    todos.splice(index, 1);
                }
            });
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    }
    setTimeout(() => {
        document.querySelector('.message').classList.add('hidden');
    }, 2000);
});
