const taskElement = document.getElementsByClassName("task");
const inputTask = document.getElementById("input-field");
const addTask = document.getElementById("add-task-btn");
const filter = document.getElementById("stage")
const taskContainer = document.getElementById("task-list");
const checkbox = document.getElementById("completed");
// const noTaskMsg = 
let taskArr = [];
let taskText;
let newTaskDetail;
let taskDetail = JSON.parse(localStorage.getItem("toDoList")) || []
document.getElementById("search").addEventListener("input", searchTask)


// use to get element from input field add to localStorage
function setTask(event) {
  event.preventDefault();
  //get task 
  taskText = inputTask.value.trim();
  // cehck condition task has value or not
  if (taskText) {
    // get task from localStorage
    let existingTasks = JSON.parse(localStorage.getItem("toDoList")) || [];

    // add new task
    let newTask = { id: "todo_" + Date.now(), task: taskText, checked: false };
    // push this new task to array
    existingTasks.push(newTask);

    // store existingTasks array to taskArr
    taskArr = existingTasks;
    // Add to local storage
    localStorage.setItem("toDoList", JSON.stringify(taskArr));

    //addTaskToDOM functio call with argument newTask
    addTaskToDOM(newTask);
    // empty input field
    inputTask.value = "";
  } else {
    // if inputField is empty
    alert("Please input task details");
  }
}

// add task to DOM
function addTaskToDOM(task) {
  // create div
  const taskElem = document.createElement("div");
  // add classes
  taskElem.classList =
    `task bg-amber-100 flex max-sm:flex-col gap-5 items-start sm:items-center sm:justify-between sm:gap-10 px-6 py-4 rounded-md w-full my-5 ${task.checked ? "completed" : ""}`;
  // add id
  taskElem.id = task.id;
  // div content
  taskElem.innerHTML = `
  <input 
    type="checkbox" 
    class="sm:size-7 size-5 shrink-0 appearance-none border-2 border-red-400 bg-red-400 rounded-md checked:bg-transparent checked:border-none checked:text-green-500 checked:before:content-['✔'] checked:before:text-green-500 checked:before:flex checked:before:items-center checked:before:justify-center checked:before:w-full checked:before:h-full"
    onclick="markAsCompleted(this)" 
    ${task.checked ? "checked" : ""} 
  />

  <p class="taskTitle text-ellipsis w-full max-sm:text-sm ${task.checked ? "line-through" : ""}">${task.task}</p>
  <div class="flex gap-2">
    <button onclick="editTask(this)" class="self-start px-6 py-3 rounded-md font-medium text-red-500 hover:font-bold transition-all duration-300 cursor-pointer max-sm:text-xs ${task.checked ? "hidden" : ""}">Edit</button>

    <button onclick="deleteTask(this)" class="self-start border border-red-500 px-6 py-3 rounded-md font-semibold text-red-500 hover:shadow-btn transition-all duration-300 cursor-pointer max-sm:text-xs">Delete</button>
  </div>`;

  // add this div to DOM
  taskContainer.appendChild(taskElem);

}

// use to edit task
function editTask(button) {
  // get new task from prompt box
  let newTask = prompt("write your new task here");

  // check condition value of prompt is empty or not
  if (newTask.length > 0) {

    // grab p tag
    button.parentElement.previousElementSibling.textContent = newTask;
    //grab id of task div (main div)
    let editedTaskId = button.parentElement.parentElement.id;

    //filter taskArr using task id
    newTaskDetail = taskArr.filter(task => task.id == editedTaskId)

    // check newTaskDetail exit or not
    if (newTaskDetail[0]) {
      //if yes then store new task to exixting
      newTaskDetail[0].task = newTask
    }


    // testing not usefull
    // newTaskDetail = taskArr.map(task =>
    //   task.id == editedTaskId ? console.log("found") : console.log("not found")
    // )

    // add the updated array to localStorage
    localStorage.setItem("toDoList", JSON.stringify(taskArr))
  } else {

    //it execute if prompt box is empty
    alert("Please add task detail !")
    return
  }
}

//use to delete task
function deleteTask(button) {
  let alertResult = confirm("Are you sure you want to delete task?")

  if (alertResult) {
    let deletedTask = button.parentElement.parentElement
    deletedTask.remove()

    let deletedTaskId = deletedTask.id;

    let updateTaskList = taskArr.filter(task => task.id !== deletedTaskId)

    localStorage.setItem("toDoList", JSON.stringify(updateTaskList))
    taskArr = updateTaskList;
    console.log(updateTaskList);


  } else {
    return
  }
}

// use to mark completed task
function markAsCompleted(checkbox) {
  let taskElement = checkbox.parentElement;
  let taskId = taskElement.id;
  const edit = checkbox.nextElementSibling.nextElementSibling.firstElementChild
  let taskTitle = taskElement.querySelector(".taskTitle");

  taskTitle.classList.toggle("line-through", checkbox.checked);
  taskElement.classList.toggle("completed", checkbox.checked);
  edit.classList.toggle("hidden", checkbox.checked)


  // ...task means grab all property of object | checked: checkbox.checked it use to updated this property of object
  let updatedTasks = taskArr.map(task =>
    task.id === taskId ? { ...task, checked: checkbox.checked } : task
  );
  localStorage.setItem("toDoList", JSON.stringify(updatedTasks));
}

// use to filter tasks
function filterTask() {

  for (let i = 0; i <= taskElement.length; i++) {
    if (filter.value == "completed") {
      if (taskElement[i].classList.contains("completed")) {
        taskElement[i].classList.remove("hidden")
        taskElement[i].classList.add("block")
      } else {
        taskElement[i].classList.add("hidden")
        taskElement[i].classList.remove("block")
      }
    }
    else if (filter.value == "remaining") {
      if (!taskElement[i].classList.contains("completed")) {
        taskElement[i].classList.remove("hidden")
        taskElement[i].classList.add("block")
      } else {
        taskElement[i].classList.add("hidden")
        taskElement[i].classList.remove("block")
      }

    }
    else {
      taskElement[i].classList.remove("hidden")
      taskElement[i].classList.add("block")
    }
  }
}

// search task
function searchTask() {
  const search = document.getElementById("search").value.trim();
  for (let i = 0; i <= taskElement.length; i++) {
    if (taskElement[i].textContent.includes(search)) {
      taskElement[i].classList.add("block")
      taskElement[i].classList.remove("hidden")
    } else {
      taskElement[i].classList.add("hidden")
      taskElement[i].classList.remove("block")
    }

  }
}

// take value from localStorage and add to DOM
document.addEventListener("DOMContentLoaded", () => {
  let storedTasks = JSON.parse(localStorage.getItem("toDoList")) || [];
  taskArr = storedTasks;
  storedTasks.forEach(task => {
    addTaskToDOM(task);
  });

});




// What isse I face
// Transform all to localStorage
// grab specific object's specific property from localStorage (it always shows undefined)
// on reload display all tasks which are in localStorage
//