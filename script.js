const taskElement = document.getElementsByClassName("task");
const inputTask = document.getElementById("inputTask");
const addTask = document.getElementById("add-task-btn");
const filter = document.getElementById("stage")
const taskContainer = document.getElementById("task-list");
const checkbox = document.getElementById("completed");
let taskArr = [];
let taskText;
let newTaskDetail;
let taskDetail = JSON.parse(localStorage.getItem("toDoList")) || []




function setTask(event) {
  event.preventDefault();

  taskText = inputTask.value.trim();
  if (taskText) {
    // Load existing tasks first
    let existingTasks = JSON.parse(localStorage.getItem("toDoList")) || [];

    // Add new task
    let newTask = { id: "todo_" + Date.now(), task: taskText, checked: false };
    existingTasks.push(newTask);

    // Update taskArr
    taskArr = existingTasks;

    // Store in localStorage
    localStorage.setItem("toDoList", JSON.stringify(taskArr));

    // Add to UI
    addTaskToDOM(newTask);

    // Clear input field
    inputTask.value = "";
  } else {
    alert("Please input task details");
  }
}




function addTaskToDOM(task) {
  const taskElem = document.createElement("div");
  taskElem.classList =
    "task bg-amber-100 flex items-center justify-between gap-10 px-6 py-4 max-w-lg rounded-md w-full my-5";
  taskElem.id = task.id;

  taskElem.innerHTML = `
    <input type="checkbox" class="h-5 w-5 completed" onclick="markAsCompleted(this)" ${task.checked ? "checked" : ""} />
    <p class="taskTitle text-ellipsis w-full">${task.task}</p>
    <div class="flex gap-2">
      <button onclick="editTask(this)" class="self-start px-6 py-3 rounded-md font-medium text-red-500 hover:font-bold transition-all duration-300 cursor-pointer">Edit</button>
      <button onclick="deleteTask(this)" class="self-start border border-red-500 px-6 py-3 rounded-md font-semibold text-red-500 hover:shadow-[5px_5px_0px_#2d3748] transition-all duration-300 cursor-pointer">Delete</button>
    </div>`;

  taskContainer.appendChild(taskElem);

}


function editTask(button) {

  let newTask = prompt("write your new task here");
  console.log(taskArr);

  if (newTask.length > 0) {

    button.parentElement.previousElementSibling.textContent = newTask;

    let editedTaskId = button.parentElement.parentElement.id;
    newTaskDetail = taskArr.filter(task => task.id == editedTaskId)
    newTaskDetail[0].task = newTask

    if (newTaskDetail[0]) {
      newTaskDetail[0].task = newTask
    }
    // newTaskDetail = taskArr.map(task =>
    //   task.id == editedTaskId ? console.log("found") : console.log("not found")

    // )

    localStorage.setItem("toDoList", JSON.stringify(taskArr))
  } else {
    alert("Please add task detail !")
    return
  }
}

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

// function markAsCompleted(checkbox) {
//   const taskElement = checkbox.parentElement
//   const taskTitle = checkbox.nextElementSibling
//   const edit = checkbox.nextElementSibling.nextElementSibling.firstElementChild
//   const checkedTask = taskArr.filter(task => taskElement.id == task.id)
//   console.log(checkedTask[0].checked);

//   checkedTask[0].classList.toggle(checkbox.checked)
//   if (checkbox.checked == true) {
//     taskTitle.classList.add("line-through")
//     edit.classList.add("hidden")
//     taskElement.classList.add("completed")
//   } else {
//     taskTitle.classList.remove("line-through")
//     edit.classList.remove("hidden")
//     taskElement.classList.remove("completed")
//   }

// }

function markAsCompleted(checkbox) {
  let taskElement = checkbox.parentElement;
  let taskId = taskElement.id;
  const edit = checkbox.nextElementSibling.nextElementSibling.firstElementChild
  let taskTitle = taskElement.querySelector(".taskTitle");

  taskTitle.classList.toggle("line-through", checkbox.checked);
  taskElement.classList.toggle("completed", checkbox.checked);
  edit.classList.toggle("hidden", checkbox.checked)


  let updatedTasks = taskArr.map(task =>
    task.id === taskId ? { ...task, checked: checkbox.checked } : task
  );
  // console.log(...task);
  localStorage.setItem("toDoList", JSON.stringify(updatedTasks));
}

function filterTask() {

  for (let i = 0; i <= taskElement.length; i++) {
    if (filter.value == "Completed") {
      if (taskElement[i].classList.contains("completed")) {
        taskElement[i].classList.remove("hidden")
        taskElement[i].classList.add("block")
      } else {
        taskElement[i].classList.add("hidden")
        taskElement[i].classList.remove("block")
      }
    }
    else if (filter.value == "Remaining") {
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

document.getElementById("search").addEventListener("input", searchTask)

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

document.addEventListener("DOMContentLoaded", () => {
  let storedTasks = JSON.parse(localStorage.getItem("toDoList")) || [];
  taskArr = storedTasks;
  storedTasks.forEach(task => {
    addTaskToDOM(task);
  });
});
// str.includes("")