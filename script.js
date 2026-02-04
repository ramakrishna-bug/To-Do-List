const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const li = createTaskElement(taskText);
    taskList.appendChild(li);

    saveTasks();
    taskInput.value = "";
}

function createTaskElement(text, completed = false) {
    const li = document.createElement("li");
    li.textContent = text;

    if (completed) li.classList.add("completed");

    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.onclick = (e) => {
        e.stopPropagation();
        li.remove();
        saveTasks();
    };

    li.appendChild(deleteBtn);
    return li;
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        taskList.appendChild(
            createTaskElement(task.text, task.completed)
        );
    });
}
