//local storage management module, does all the management of the local storage items

//saves new todo items to local storage
function saveToMemory (todo) {
    let getLocalStorageTodo = localStorage.getItem("toDoList");
    let todoArray = ""
    if (getLocalStorageTodo == null) {
        todoArray = []
    } else {
        todoArray = JSON.parse(getLocalStorageTodo);
    }
    todoArray.push(todo);
    localStorage.setItem("toDoList", JSON.stringify(todoArray));
}

//delete todo items from local storage
function deleteFromMemory (index) {
    let getLocalStorageTodo = localStorage.getItem("toDoList");
    let todoArray = JSON.parse(getLocalStorageTodo);
    todoArray.splice(index, 1);
    localStorage.setItem("toDoList", JSON.stringify(todoArray));
}

//retrieves todo list from local storage
function retrieveFromMemory () {
    let getLocalStorageTodo = localStorage.getItem("toDoList");
    let todoArray = JSON.parse(getLocalStorageTodo);
    if (getLocalStorageTodo == null) {
        todoArray = []
    } else {
        todoArray = JSON.parse(getLocalStorageTodo);
    }
    return todoArray;
}

//make updates to local storage when a todo item is either completed to uncompleted by the user
function CompleteStatusToMemory (index){
    let todoIndex = index
    let getLocalStorageTodo = localStorage.getItem("toDoList");
    let todoArray = JSON.parse(getLocalStorageTodo);
    todoArray.forEach((todo, index) => {
        if (index == todoIndex && todo.completed == 0 && todo.class == "") {
            todo.completed = 1;
            todo.class = "checked"
        }else if (index == todoIndex && todo.completed == 1){
            todo.completed = 0;
            todo.class = "";
        }
    })
    localStorage.setItem("toDoList", JSON.stringify(todoArray));
}


export {saveToMemory, deleteFromMemory, retrieveFromMemory, CompleteStatusToMemory};