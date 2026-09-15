// Your Todo List App implementation will go here!
let todos = [];
// grab the form - start from chrome dev tools to do this
const todoForm = document.querySelector("#todo-form");
const todoInput  = document.querySelector("#todo-input");
// grab the todo list
const toDoList = document.querySelector("#todo-list");
const todoCount = document.querySelector("todo-count");
// grab the error message
const errorMessage = document.querySelector("#error-message");



//Initilize App here 
document.addEventListener('DOMContentLoaded', function() {
    
    renderTodos();

}




//Render Function
function renderTodos() {
    //Clear existing todos
    toDoList.innerHTLM = '';
    
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
    updateUI();
}

//Add items into to do
todoForm.addEventListener('submit', function(event) {
  event.preventDefault();

  let todoText = todoInput.value;
  let todoTrim = todoText.trim();

  //Input Validation
  if (!todoTrim === 3) {
    errorMessage.textContent = 'Longer text needed!';
  }

})
