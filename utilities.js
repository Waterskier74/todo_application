//Utilities module takes care of most of the services for the todo program

import * as localStorageServices from "./ls.js";
const completeBtn = document.getElementById("complete");
const pendingBtn = document.getElementById("pending");
const allBtn = document.getElementById("all");
const totalPending = document.getElementById("totalPending");
const todoList = document.getElementById("toDoElements");

//Get all the information needed to add a new event into memory and pass to the localStorageServices module
function newToDo (event, addNewItem) {
    let id = event.timeStamp;
    let userInput = addNewItem.value;
    let todo = {id:id, content: userInput, completed: 0, class: ""};
    if (userInput = "") {
        alert("Enter a new todo");
    } else localStorageServices.saveToMemory (todo)
}

//populate the full todo list from information that is pulled from the localStorageServices module from the local storage
function populateTodoList () {
    allBtn.style.textDecoration = "underline";
    pendingBtn.style.textDecoration = "none";
    completeBtn.style.textDecoration = "none";
    let getLocalStorageTodo = localStorage.getItem("toDoList");
    let todoArray = ""
    if(getLocalStorageTodo == null){
        todoArray = [];
    }else{
        todoArray = JSON.parse(getLocalStorageTodo);
    }
    let todoItem ="";
    todoArray.forEach((todo, index) =>{
        todoItem += `<li id="${todo.id}" index="${index}" completed="${todo.completed}" class="${todo.class}">${todo.content}</li><button class="removeTodo">X</button>`;
    })
    todoList.innerHTML = todoItem;
    pendingTodoTotal();
}

//populate the sorted todo list by pending items only
function todoPending () {
    let todoArray = localStorageServices.retrieveFromMemory();
    let todoItem="";
    todoArray.forEach((todo, index) => {
        if (todo.completed == 0) {
            todoItem += `<li id="${todo.id}" index="${index}" completed="${todo.completed}" class="${todo.class}">${todo.content}</li><button class="removeTodo">X</button>`;
        }
    })
    todoList.innerHTML = todoItem;
    pendingTodoTotal();
}

//populate the sorted todo list by completed items only
function todoCompleted () {
    let todoArray = localStorageServices.retrieveFromMemory();
    let todoItem="";
    todoArray.forEach((todo, index) => {
        if (todo.completed == 1) {
            todoItem += `<li id="${todo.id}" index="${index}" completed="${todo.completed}" class="${todo.class}">${todo.content}</li><button class="removeTodo">X</button>`;
        }
    })
    todoList.innerHTML = todoItem;
    pendingTodoTotal();
}

//calculate the number of pending items in the todo list
function pendingTodoTotal () {
    let pendingNumber = 0
    let todoArray = localStorageServices.retrieveFromMemory();
    todoArray.forEach((todo) => {
        if (todo.completed == 0) {
            pendingNumber ++;
        }
    })
    totalPending.innerHTML = pendingNumber;
}



export {newToDo, populateTodoList, todoPending, todoCompleted};

