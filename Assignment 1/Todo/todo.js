document.addEventListener("DOMContentLoaded", () => {
    const inputTodo = document.getElementById("input-todo");
    const buttonTodo = document.getElementById("button-todo");
    const ulTodo = document.getElementById("ul-todo");
    const deleteAllBtn = document.getElementById("deleteAllBtn");

    let editMode = false;
    let editElement = null;

    buttonTodo.addEventListener("click", () => {
        const text = inputTodo.value.trim();
        if (text === "") return;

        if (editMode) {
            editElement.querySelector(".text-todo").textContent = text;
            editMode = false;
            editElement = null;
            buttonTodo.textContent = "Add task";
        } else {
            createTodo(text);
        }
        inputTodo.value = "";
        saveAllTodo();
    });

    const createTodo = (task) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `<span class="text-todo text-wrap" style="overflow-wrap: break-word;">${task}</span>
    <div class="btn-group">
      <button type="button" class="btn btn-primary btn-sm edit-btn">Edit</button>
      <button type="button" class="btn btn-danger btn-sm delete-btn">Delete</button>
    </div>`;

        ulTodo.appendChild(li);
    };

    ulTodo.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            if (confirm(`Are you sure you want to delete ${e.target.closest(".list-group-item").querySelector(".text-todo").textContent} todo?`)) {
                e.target.closest(".list-group-item").remove();
                saveAllTodo();
            }
        }

        if (e.target.classList.contains("edit-btn")) {
            const li = e.target.closest(".list-group-item");
            const taskText = li.querySelector(".text-todo").textContent;

            const inputField = document.createElement("input");
            inputField.type = "text";
            inputField.value = taskText;
            inputField.classList.add("form-control");

            const span = li.querySelector(".text-todo");

            span.parentNode.removeChild(span);
            li.insertBefore(inputField, e.target.parentNode);

            e.target.textContent = "Save";
            e.target.classList.remove("edit-btn");
            e.target.classList.add("save-btn");

            editElement = li;
            editMode = true;
            return;
        }

        if (e.target.classList.contains("save-btn")) {
            const li = e.target.closest(".list-group-item");
            const inputField = li.querySelector("input");

            if (!inputField) return;

            const updatedText = inputField.value.trim();

            if (updatedText === "") return;

            const updatedSpan = document.createElement("span");
            updatedSpan.classList.add("text-todo", "text-wrap");
            updatedSpan.textContent = updatedText;
            console.log(updatedSpan);

            inputField.parentNode.removeChild(inputField);
            li.insertBefore(updatedSpan, e.target.closest(".btn-group"));

            e.target.textContent = "Edit";
            e.target.classList.remove("save-btn");
            e.target.classList.add("edit-btn");

            editMode = false;
            editElement = null;
            saveAllTodo();
            console.log(inputField.value.trim());
        }
    });

    deleteAllBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete all todos?")) {
            ulTodo.innerHTML = ""; // Clear the todo list
            localStorage.removeItem("allTodos"); // Remove from localStorage
        }
    });

    const saveAllTodo = () => {
        const allTodos = [...document.querySelectorAll(".text-todo")].map(
            (task) => task.textContent
        );
        localStorage.setItem("allTodos", JSON.stringify(allTodos));
    };

    const loadAllTodo = () => {
        const allTodos = JSON.parse(localStorage.getItem("allTodos")) || [];
        allTodos.forEach((task) => createTodo(task));
    };

    loadAllTodo();
});
