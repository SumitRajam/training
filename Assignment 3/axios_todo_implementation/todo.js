document.addEventListener("DOMContentLoaded", () => {
    const inputTodo = document.getElementById("input-todo");
    const buttonTodo = document.getElementById("button-todo");
    const ulTodo = document.getElementById("ul-todo");
    const deleteAllBtn = document.getElementById("deleteAllBtn");

    let todos = [];
    let editMode = false;
    let editElement = null;

    function notify(message) {
        Toastify({
            text: `${message}`,
            duration: 3000,
            gravity: "top",
            position: "right",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)"
            }
        }).showToast();
    }

    async function fetchTodoFromAPI() {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
            console.log(response.data);
            todos = response.data.slice(0, 10).map(todo => ({
                id: todo.id,
                title: todo.title
            }));
            todos.forEach(todo => {
                createTodo(todo.title, todo.id);
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function addNewTodo() {
        const text = inputTodo.value.trim();

        try {
            const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
                userId: 1,
                title: text,
                completed: false
            });
            console.log(response)
            if (response.status === 201) {
                const successMessage = `The new Todo with title: "${response.data.title}" is added successfully. Status: ${response.status}`;
                notify(successMessage);
                console.log(successMessage);

                todos.push({
                    id: response.data.id,
                    title: text
                });
                createTodo(text, response.data.id);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    fetchTodoFromAPI();

    const createTodo = (task, id) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `<span class="text-todo text-wrap" style="overflow-wrap: break-word;">${task}</span>
    <div class="btn-group">
      <button type="button" class="btn btn-primary btn-sm edit-btn" data-id="${id}">Edit</button>
      <button type="button" class="btn btn-danger btn-sm delete-btn" data-id="${id}">Delete</button>
    </div>`;

        ulTodo.appendChild(li);
    };

    buttonTodo.addEventListener("click", () => {
        const text = inputTodo.value.trim();
        if (text === "") return;

        if (editMode) {
            editElement.querySelector(".text-todo").textContent = text;
            editMode = false;
            editElement = null;
            buttonTodo.textContent = "Add task";
        } else {
            addNewTodo();
        }
        inputTodo.value = "";
    });


    ulTodo.addEventListener("click", async (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const todoId = e.target.closest(".list-group-item").querySelector(".edit-btn").getAttribute("data-id");
            const todoTitle = e.target.closest(".list-group-item").querySelector("span").textContent;
            if (confirm(`Are you sure you want to delete this todo?`)) {
                try {
                    response = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
                    console.log(response);
                    if (response.status === 200) {
                        const successMessage = `The todo with id: "${todoId}" and title: "${todoTitle}" is deleted successfully. Status: ${response.status}`;
                        notify(successMessage);
                        console.log(successMessage);
                        e.target.closest(".list-group-item").remove();
                        todos = todos.filter(todo => todo.id !== parseInt(todoId));
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        }

        if (e.target.classList.contains("edit-btn")) {
            const li = e.target.closest(".list-group-item");
            const taskText = li.querySelector(".text-todo").textContent;
            const todoId = e.target.getAttribute("data-id");

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
            const todoId = e.target.getAttribute("data-id");
            const todoToUpdate = e.target.closest(".list-group-item").querySelector("input").textContent;
            if (todoToUpdate) {
                todoToUpdate.title = updatedText;
            }

            try {
                const response = await axios.patch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
                    title: updatedText,
                });
                console.log(response)
                if (response.status === 200) {
                    const successMessage = `Todo updated to "${response.data.title}" successfully.\n Status: ${response.status}`;
                    notify(successMessage);
                    console.log(successMessage);
                }

                inputField.parentNode.removeChild(inputField);
                li.insertBefore(updatedSpan, e.target.closest(".btn-group"));

                e.target.textContent = "Edit";
                e.target.classList.remove("save-btn");
                e.target.classList.add("edit-btn");

                editMode = false;
                editElement = null;
            } catch (error) {
                console.error('Error:', error);
            }
        }
    });

    deleteAllBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete all todos?")) {
            ulTodo.innerHTML = "";
            notify("All todos have been deleted")
        }
    });

});
