const taskContainer = document.getElementById("task-container");
const taskElement = document.getElementsByClassName("task");

const inputTask = document.getElementById("input-task");
const addTask = document.getElementById("add-task");

const filter = document.getElementById("filter");
const markCompleted = document.getElementsByClassName("mark-completed");

let taskArr = [];

// use to get element from input field add to localStorage
function setTask(event) {
  event.preventDefault();

  const taskText = inputTask.value.trim();
  if (taskText) {
    const existingTasks = JSON.parse(localStorage.getItem("toDoList")) || [];
    const newTask = {
      id: "todo_" + Date.now(),
      task: taskText,
      checked: false,
    };
    existingTasks.push(newTask);

    taskArr = existingTasks;

    localStorage.setItem("toDoList", JSON.stringify(taskArr));
    addTaskToDOM(newTask);

    inputTask.value = "";
  } else {
    alert("Please input task details");
  }
}

// add task to DOM
function addTaskToDOM(task) {
  const taskElem = document.createElement("li");

  taskElem.classList = `task bg-amber-100 flex max-sm:flex-col gap-5 items-start sm:items-center sm:justify-between sm:gap-10 px-6 py-4 rounded-md w-full my-5 ${
    task.checked ? "completed" : ""
  }`;
  taskElem.id = task.id;
  taskElem.setAttribute("data-state", task.checked ? "completed" : "");

  taskElem.innerHTML = `
  <input 
    type="checkbox" 
    class="sm:size-7 size-5 shrink-0 appearance-none border-2 border-red-400 bg-red-400 rounded-md checked:bg-transparent checked:border-none checked:text-green-500 checked:before:content-['✔'] checked:before:text-green-500 checked:before:flex checked:before:items-center checked:before:justify-center checked:before:w-full checked:before:h-full"
    onclick="markAsCompleted(this)" 
    ${task.checked ? "checked" : ""} 
  />

  <p class="task-title text-ellipsis w-full max-sm:text-sm ${
    task.checked ? "line-through" : ""
  }">${task.task}</p>
  <div class="btns flex gap-2 self-start">
    <button onclick="editTask(this)" id="edit-task" class="self-start px-6 py-3 rounded-md font-medium text-red-500 hover:font-bold transition-all duration-300 cursor-pointer max-sm:text-xs ${
      task.checked ? "hidden" : ""
    }">Edit</button>

    <button onclick="deleteTask(this)" class="self-start border border-red-500 px-6 py-3 rounded-md font-semibold text-red-500 hover:shadow-btn transition-all duration-300 cursor-pointer max-sm:text-xs">Delete</button>
  </div>`;

  taskContainer.appendChild(taskElem);
}

// use to edit task
function editTask(button) {
  const editedTask = prompt("write your new task here");
  const newText = editedTask.trim();
  if (newText) {
    const editedTaskId = button.closest(".task").id;
    button.closest(".btns").previousElementSibling.textContent = newText;

    const newTaskDetail = taskArr.filter((task) => task.id == editedTaskId);
    newTaskDetail[0].task = editedTask;

    localStorage.setItem("toDoList", JSON.stringify(taskArr));
  } else {
    alert("Please add task detail !");
  }
}

//use to delete task
function deleteTask(button) {
  const alertResult = confirm("Are you sure you want to delete task?");

  if (alertResult) {
    const deletedTask = button.closest(".task");
    deletedTask.remove();

    const deletedTaskId = deletedTask.id;

    const updateTaskList = taskArr.filter((task) => task.id !== deletedTaskId);

    taskArr = updateTaskList;
    localStorage.setItem("toDoList", JSON.stringify(taskArr));
  }
}

// use to mark completed task
function markAsCompleted(checkbox) {
  const taskElement = checkbox.closest(".task");
  const taskId = taskElement.id;

  const edit = taskElement.querySelector("#edit-task");
  const taskTitle = taskElement.querySelector(".task-title");

  taskTitle.classList.toggle("line-through", checkbox.checked);
  edit.classList.toggle("hidden", checkbox.checked);

  if (checkbox.checked) {
    taskElement.setAttribute("data-state", "completed");
  } else {
    taskElement.setAttribute("data-state", "");
  }

  // let updatedTask = taskArr.filter(task => task.id == taskId)
  // updatedTask[0].checked = !updatedTask[0].checked

  // let updatedTask = taskArr.map(task => task.id == taskId ? { ...task, checked: checkbox.checked } : task)
  const updatedTask = taskArr.map((task) => {
    if (task.id === taskId) {
      return { ...task, checked: checkbox.checked };
    }
    return task;
  });

  taskArr = updatedTask;

  localStorage.setItem("toDoList", JSON.stringify(taskArr));
}

// use to filter tasks
function filterTask() {
  for (let i = 0; i < taskElement.length; i++) {
    const state = filter.value;

    switch (state) {
      case "completed":
        if (taskElement[i].getAttribute("data-state") == "completed") {
          taskElement[i].classList.remove("hidden");
          taskElement[i].classList.add("block");
        } else {
          taskElement[i].classList.add("hidden");
          taskElement[i].classList.remove("block");
        }
        break;
      case "remaining":
        if (taskElement[i].getAttribute("data-state") == "") {
          taskElement[i].classList.remove("hidden");
          taskElement[i].classList.add("block");
        } else {
          taskElement[i].classList.add("hidden");
          taskElement[i].classList.remove("block");
        }
        break;
      default:
        taskElement[i].classList.remove("hidden");
        taskElement[i].classList.add("block");
    }
  }
}

// search task
function searchTask() {
  const search = document.getElementById("search").value.trim().toLowerCase();

  const taskTitle = document.querySelectorAll(".task-title");

  for (let i = 0; i < taskTitle.length; i++) {
    if (taskTitle[i].textContent.toLowerCase().includes(search)) {
      taskElement[i].classList.add("block");
      taskElement[i].classList.remove("hidden");
    } else {
      taskElement[i].classList.add("hidden");
      taskElement[i].classList.remove("block");
    }
  }
}
// take value from localStorage and add to DOM
document.addEventListener("DOMContentLoaded", () => {
  const storedTasks = JSON.parse(localStorage.getItem("toDoList")) || [];
  taskArr = storedTasks;
  storedTasks.forEach((task) => {
    addTaskToDOM(task);
  });
});
