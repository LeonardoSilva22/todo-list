// SELECTORS

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');

// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteTodo);
todoList.addEventListener('change', checkTodo);
// FUNCTIONS

function addTodo(e) {
	e.preventDefault();

	//CREATE DIV
	const todoDiv = document.createElement('div');
	todoDiv.classList.add('todo-item');

	//CREATE CHECKBOX
	const todoCheck = document.createElement('input');
	todoCheck.type = 'checkbox';
	todoCheck.classList.add('todo-checked');
	todoDiv.appendChild(todoCheck);

	//CREATE LI
	const todoLi = document.createElement('li');
	todoLi.innerText = todoInput.value;
	if (todoInput.value !== '') {
		saveLocalTodos(todoInput.value);
		todoDiv.appendChild(todoLi);
		todoList.appendChild(todoDiv);
		todoInput.value = '';
	} else {
		alert('Preencher o Campo');
	}

	// CREATE DELETE BTN
	const todoDelete = document.createElement('button');
	todoDelete.innerHTML = '<i class="fa-solid fa-trash"></i>';
	todoDelete.classList.add('delete-btn');
	todoDiv.appendChild(todoDelete);
}

function deleteTodo(e) {
	const item = e.target;
	if (item.classList[0] === 'delete-btn') {
		const todo = item.parentElement;
		removeTodos(todo);
		todo.remove();
	}
}

function checkTodo(e) {
	const item = e.target;

	item.parentElement.classList.toggle('checked');
}

function saveLocalTodos(todo) {
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	todos.push(todo);
	localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	console.log(todos);
	todos.forEach((todo) => {
		//CREATE DIV
		const todoDiv = document.createElement('div');
		todoDiv.classList.add('todo-item');

		//CREATE CHECKBOX
		const todoCheck = document.createElement('input');
		todoCheck.type = 'checkbox';
		todoCheck.classList.add('todo-checked');
		todoDiv.appendChild(todoCheck);

		//CREATE LI
		const todoLi = document.createElement('li');
		todoLi.innerText = todo;
		todoDiv.appendChild(todoLi);
		todoList.appendChild(todoDiv);

		// CREATE DELETE BTN
		const todoDelete = document.createElement('button');
		todoDelete.innerHTML = '<i class="fa-solid fa-trash"></i>';
		todoDelete.classList.add('delete-btn');
		todoDiv.appendChild(todoDelete);
	});
}

function removeTodos(todo) {
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	const todoIndex = todo.children[1].innerText;
	todos.splice(todos.indexOf(todoIndex), 1);
	localStorage.setItem('todos', JSON.stringify(todos));
}
