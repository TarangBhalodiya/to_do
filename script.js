const inputTask = document.getElementById("inputTask");
const addTask = document.getElementById("addBtn");
const filter = document.getElementById("stage")
const taskContainer = document.getElementById("taskList");
// addTask.addEventListener("click", setTask)
let taskText;

function getTask() {
  taskText = inputTask.value.trim();

  return taskText;
}

function setTask(event) {
  event.preventDefault();
  if (inputTask.value.trim()) {
    getTask()
    const taskElem = document.createElement("div");
    taskElem.classList = "task bg-amber-100 flex items-center justify-between gap-10 px-6 py-4 max-w-lg rounded-md w-full my-5 "
    taskElem.innerHTML = `
    <input type="checkbox" id="completed" class="h-5 w-5" onclick="markAsCompleted(this)" />
  <p class="taskTitle text-ellipsis w-full">
    ${taskText}
  </p>
  <div class="flex gap-2">
  <button
    id="edit"
    onclick="editTask(this)"
    class="self-start px-6 py-3 rounded-md font-medium text-red-500 hover:font-bold transition-all duration-300 cursor-pointer"
  >
    Edit
  </button>
  <button
    id="delete"
    onclick = "deleteTask(this)"
    class="self-start border border-red-500 px-6 py-3 rounded-md font-semibold text-red-500 hover:shadow-[5px_5px_0px_#2d3748] transition-all duration-300 cursor-pointer"
  >
    Delete
  </button>
  </div>`
    taskContainer.appendChild(taskElem);
    inputTask.value = '';
    return taskElem
  } else {
    alert("Please input task details");
  }
}



function deleteTask(button) {
  let alertResult = confirm("Are you sure you want to delete task?")

  if (alertResult) {
    button.parentElement.parentElement.remove()
  } else {
    return
  }
}

function editTask(button) {

  let newTask = prompt("write your new task here");
  if (newTask.length > 0) {
    button.parentElement.previousElementSibling.textContent = newTask;
  } else {
    alert("Please add task detail !")
    return
  }
}

const checkbox = document.getElementById("completed")
function markAsCompleted(checkbox) {
  const taskElement = checkbox.parentElement
  const taskTitle = checkbox.nextElementSibling
  const edit = checkbox.nextElementSibling.nextElementSibling.firstElementChild
  if (checkbox.checked == true) {
    taskTitle.classList.add("line-through")
    edit.classList.add("hidden")
    taskElement.classList.add("completed")
  } else {
    taskTitle.classList.remove("line-through")
    edit.classList.remove("hidden")
    taskElement.classList.remove("completed")
  }

}

function filterTask() {
  const taskElement = document.getElementsByClassName("task")

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












    //   else {
    //     taskElement[i].classList.add("hidden")
    //     taskElement[i].classList.remove("block")
    //     console.log(taskElement[i])
    //   }
    //   if (filter.value == "Remaining" && !taskElement[i].classList.contains("completed")) {
    //     // console.log(taskElement[i])
    //   } else {
    //     taskElement[i].classList.add("hidden")
    //     taskElement[i].classList.remove("block")
    //     console.log(taskElement[i])
    //   }

    // }

    // console.log(classContain)

  }
}