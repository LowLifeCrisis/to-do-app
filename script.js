// Your Todo List App implementation will go here!
let todos = [];
// grab the form - start from chrome dev tools to do this
const todoForm = document.querySelector("#todo-form");
const todoInput  = document.querySelector("#todo-input");
// grab the todo list
const toDoList = document.querySelector("#todo-list");
const todoCount = document.querySelector("#todo-count");
// grab the error message
const errorMessage = document.querySelector("#error-message");



//Initilize App here 
document.addEventListener('DOMContentLoaded', function() {

    loadTodosFromStorage();

     renderTodos();

})




//Render Function
function renderTodos() {
    //Clear existing todos
    toDoList.innerHTML = '';

    
    //Create and append todo items
    todos.forEach(todo => {
        const todoElement = createTodoElement(todo);
        toDoList.appendChild(todoElement);
    });
}
// create the todo obejct and add it to the todo array
function addTodo(text) {
    const newTodo = {
        id: Date.now().toString(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    };

    todos.push(newTodo);
}

//Add items into to do
todoForm.addEventListener('submit', function(event) {
  event.preventDefault();

  errorMessage.classList.remove('show');
  let todoText = todoInput.value;
  let todoTrim = todoText.trim();

  //Input Validation
  if (todoTrim.length < 3) {
    errorMessage.textContent = "Longer text needed!";
    errorMessage.classList.add('show');
    return;
  }



   addTodo(todoTrim);
   event.target.reset();
   renderTodos();
   
   //Save to local Storage
   localStorage.setItem('task', JSON.stringify(todos));

})

toDoList.addEventListener('change', handleTodoToggle)

function handleTodoToggle(event) {
    if (event.target.type === 'checkbox') {
        const todoItem = event.target.closest('.todo-item');
        
        const todoId = todoItem.dataset.id;
        toggleTodo(todoId);
    }
}

toDoList.addEventListener('click', handleTodoDelete);

function handleTodoDelete(event) {
    if (event.target.classList.contains('delete-btn')) {
         const todoItem = event.target.closest('.todo-item');
         const todoId = todoItem.dataset.id;
         deleteTodo(todoId)
    }
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    localStorage.setItem('task', JSON.stringify(todos))
    renderTodos();

}

function toggleTodo(id) {
    
    todos = todos.map(todo => {
        
        const isTargetTodo = todo.id === id;

        if (isTargetTodo) {
            
            const updatedTodo = { ...todo, completed: !todo.completed };
            return updatedTodo;
        }

        
        return todo;
    });

     renderTodos();
}



function createTodoElement(todoObject) {
    const li =  document.createElement("li");

    const completedClass = todoObject.completed ? ' completed' : '';
    li.className = `todo-item${completedClass}`;

    li.setAttribute('data-id', todoObject.id);

    const checkboxChecked = todoObject.completed ? 'checked' : '';
    const checkboxAction = todoObject.completed ? 'incomplete' : 'complete';

     li.innerHTML = `
        <input type="checkbox"
               class="todo-checkbox"
               ${checkboxChecked}
               aria-label="Mark "${todoObject.text}" as ${checkboxAction}">
        <span class="todo-text"></span>
        <div class="todo-actions">
            <button class="delete-btn" aria-label="Delete "${todoObject.text}"">Delete</button>
        </div>
    `;

    const textSpan = li.querySelector('.todo-text');
    textSpan.textContent = todoObject.text;

    return li;

    
}

function loadTodosFromStorage() {
    const storedTodos = localStorage.getItem('task')

    if (storedTodos) {
        todos = JSON.parse(storedTodos);
    }
}

