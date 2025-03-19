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
    const existingTasks = JSON.parse(localStorage.getItem("to-do-list")) || [];
    const newTask = {
      id: "todo_" + Date.now(),
      task: taskText,
      checked: false,
    };
    existingTasks.push(newTask);

    taskArr = existingTasks;

    localStorage.setItem("to-do-list", JSON.stringify(taskArr));
    addTaskToDOM(newTask);

    inputTask.value = "";
  } else {
    alert("Please input task details");
  }
}

function taskStructure(task) {
  const structure = `
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

  return structure;
}

// add task to DOM
function addTaskToDOM(task) {
  const taskElem = document.createElement("li");

  taskElem.classList = `task bg-amber-100 flex max-sm:flex-col gap-5 items-start sm:items-center sm:justify-between sm:gap-10 px-6 py-4 rounded-md w-full my-5 ${
    task.checked ? "completed" : ""
  }`;
  taskElem.id = task?.id ?? "todo_" + Date.now();
  taskElem.setAttribute("data-state", task.checked ? "completed" : "remaining");

  taskElem.innerHTML = taskStructure(task);

  taskContainer.appendChild(taskElem);
}

// use to edit task
function editTask(button) {
  const editedTask = prompt("write your new task here");
  const taskElement = button.closest(".task");
  const newText = editedTask.trim();

  if (newText) {
    const editedTaskId = button.closest(".task")?.id;

    const newTaskDetail = taskArr.filter((task) => task?.id == editedTaskId);
    newTaskDetail[0].task = newText;
    taskElement.innerHTML = taskStructure(newTaskDetail[0]);

    localStorage.setItem("to-do-list", JSON.stringify(taskArr));
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

    const updateTaskList = taskArr.filter((task) => task?.id !== deletedTaskId);

    taskArr = updateTaskList;
    localStorage.setItem("to-do-list", JSON.stringify(taskArr));
  }
}

// use to mark completed task
function markAsCompleted(checkbox) {
  const taskElement = checkbox.closest(".task");
  const taskId = taskElement?.id;

  const edit = taskElement?.querySelector("#edit-task");
  const taskTitle = taskElement?.querySelector(".task-title");

  taskTitle.classList.toggle("line-through", checkbox.checked);
  edit.classList.toggle("hidden", checkbox.checked);

  if (checkbox.checked) {
    taskElement.setAttribute("data-state", "completed");
  } else {
    taskElement.setAttribute("data-state", "remaining");
  }

  const updatedTask = taskArr.map((task) => {
    if (task.id === taskId) {
      return { ...task, checked: checkbox.checked };
    }
    return task;
  });

  taskArr = updatedTask;

  localStorage.setItem("to-do-list", JSON.stringify(taskArr));
}

// use to filter tasks
function filterTask() {
  const state = filter.value;
  const locallyStoreTask = JSON.parse(localStorage.getItem("to-do-list"));

  switch (state) {
    case "completed":
      taskContainer.innerHTML = "";
      const completedTodo = locallyStoreTask.filter((task) => task.checked);
      completedTodo.forEach((task) => addTaskToDOM(task));
      break;
    case "remaining":
      taskContainer.innerHTML = "";
      const remainingTodo = locallyStoreTask.filter((task) => !task.checked);
      console.log(remainingTodo);
      remainingTodo.forEach((task) => addTaskToDOM(task));
      break;
    default:
      taskContainer.innerHTML = "";
      locallyStoreTask.forEach((task) => addTaskToDOM(task));
  }
}

// search task
function searchTask() {
  const search = document
    .getElementById("search")
    ?.value?.trim()
    ?.toLowerCase();

  const locallyStoreTask = JSON.parse(localStorage.getItem("to-do-list")) || [];

  taskContainer.innerHTML = "";

  const searchedText = locallyStoreTask.filter((task) =>
    task.task?.toLowerCase()?.includes(search)
  );

  searchedText.forEach((task) => addTaskToDOM(task));
}

// is display all task when website is reload
document.addEventListener("DOMContentLoaded", () => {
  const storedTasks = JSON.parse(localStorage.getItem("to-do-list")) || [];

  taskArr = storedTasks;

  storedTasks.forEach((task) => {
    addTaskToDOM(task);
  });
});

// TODO: make new html every time when text edit
// FIXME: remaining in data-state        DONE
// FIXME: Option chaining
// TODO: remove element from ui    DONE
