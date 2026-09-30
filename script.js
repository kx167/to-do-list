document.addEventListener('DOMContentLoaded', function () {

    const inputText = document.getElementById('inputText');
    const btn = document.getElementById('btn');
    const taskcontain = document.getElementById('taskcontain');
    const clearAll = document.getElementById('clearAll');

    let allTasks = JSON.parse(localStorage.getItem("task")) || [];

    render();

    function saveToLocal() {
        localStorage.setItem("task", JSON.stringify(allTasks));
    }

    function render() {
        taskcontain.innerHTML = "";

        allTasks.forEach((taskObj, index) => {

            const li = document.createElement("li");

            const span = document.createElement("span");
            span.textContent = taskObj.task;

            if (taskObj.isComplete) {
                span.classList.add("completed");
            }

            // Toggle complete
            span.addEventListener("click", () => {
                taskObj.isComplete = !taskObj.isComplete;
                saveToLocal();
                render();
            });

            li.appendChild(span);

            // Buttons container
            const btnGroup = document.createElement("div");
            btnGroup.classList.add("task-buttons");

            // Edit button
            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.addEventListener("click", () => {
                const newTask = prompt("Edit your task:", taskObj.task);
                if (newTask && newTask.trim() !== "") {
                    taskObj.task = newTask;
                    saveToLocal();
                    render();
                }
            });

            // Delete button
            const delBtn = document.createElement("button");
            delBtn.textContent = "Delete";
            delBtn.addEventListener("click", () => {
                allTasks.splice(index, 1);
                saveToLocal();
                render();
            });

            btnGroup.appendChild(editBtn);
            btnGroup.appendChild(delBtn);

            li.appendChild(btnGroup);
            taskcontain.appendChild(li);
        });
    }

    // Add Task
    function addTask() {
        const task = inputText.value.trim();

        if (task === "") {
            alert("Write something first!");
            return;
        }

        allTasks.push({
            task: task,
            isComplete: false
        });

        saveToLocal();
        inputText.value = "";
        render();
    }

    btn.addEventListener("click", addTask);

    // Add with Enter key
    inputText.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            addTask();
        }
    });

    // Clear All Tasks
    clearAll.addEventListener("click", function () {
        if (confirm("Are you sure you want to delete all tasks?")) {
            allTasks = [];
            saveToLocal();
            render();
        }
    });

});
