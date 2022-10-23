import * as utilities from "./utilities.js";
import * as localStorageServices from "./ls.js";

// populate the initial Todo list and get all the items needed from the DOM, assign listening events
utilities.populateTodoList();
const addNewItem = document.getElementById("toDoInput");
const addTodoBtn = document.getElementById("addBtn");
const completeBtn = document.getElementById("complete");
const pendingBtn = document.getElementById("pending");
const allBtn = document.getElementById("all");
pendingBtn.addEventListener("click", sortPending);
allBtn.addEventListener("click", sortAll);
completeBtn.addEventListener("click", sortComplete);
addTodoBtn.addEventListener("click", addTodo);

// Add a listening event to each of the LI elements and when they are click toggle the status
const list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
    let index = ev.target.getAttribute("index");
    localStorageServices.CompleteStatusToMemory (index);
    utilities.populateTodoList();
  }
}, false);

// Add a listening event on each of the remove buttons per LI element and remove the item when clicked
list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'BUTTON') {
        let index = ev.target.getAttribute("index");
        localStorageServices.deleteFromMemory(index);
        utilities.populateTodoList();
    }
  }, false);

// Function for when the addTodo button is clicked on  
function addTodo (event) {
    utilities.newToDo(event, addNewItem);
    addNewItem.value = "";
    utilities.populateTodoList();
}

// Function for when the allBtn is clicked repopulates the todo list
function sortAll () {
    allBtn.style.textDecoration = "none";
    pendingBtn.style.textDecoration = "none";
    completeBtn.style.textDecoration = "underline";
    utilities.populateTodoList ();    
}

// Function for when the ActiveBtn is click to show only the active Todo items
function sortPending () {
    allBtn.style.textDecoration = "none";
    pendingBtn.style.textDecoration = "underline";
    completeBtn.style.textDecoration = "none";
    let ul = document.getElementById("toDoElements")
    let items = ul.getElementsByTagName("LI");
    utilities.todoPending();

}

// Function for when the CompleteBtn is clicked to only show the completed items
function sortComplete () {
    allBtn.style.textDecoration = "none";
    pendingBtn.style.textDecoration = "none";
    completeBtn.style.textDecoration = "underline";
    utilities.todoCompleted();
}