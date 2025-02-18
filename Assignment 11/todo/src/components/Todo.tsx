import React, { useState, useEffect } from 'react'



export default function Todo() {
    let [todos, setTodos] = useState<string[]>([]);
    const addBtn = document.querySelector('#input-todo') as HTMLInputElement;
    const confirmDeleteBtn = document.querySelector('#deleteConfirmation') as HTMLInputElement;
    const [isDeleting, setIsDeleting] = useState(false);
    const [input, setInput] = useState("");

    useEffect(() => {
        createTodolist();
    });

    useEffect(() => {
        localStorage.setItem('storedTodos', JSON.stringify(todos));
    }, [todos]);

    function createTodolist() {
        if (!localStorage.getItem('storedTodos')) {
            localStorage.setItem('todos', JSON.stringify(todos))
        };
    }

    const addTodo = () => {
        if (input.trim() !== '') {
            setTodos((prevTodos) => [input, ...prevTodos]);
            setInput("");
        }

    };

    const deleteTodo = (index: number) => {
        setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
    };

    const deleteAllTodos = () => {
        setTodos([]);
    };

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center p-5">
                <div className="card shadow-lg rounded" style={{ height: "580px", minWidth: "350px" }}>
                    <div className="card-body d-flex flex-column">
                        <h2 className="text-center mb-3">Todo List</h2>
                        <input type="text" id="input-todo" className="form-control mb-3" onChange={(e) => setInput(e.target.value)} placeholder="Enter task" />
                        <button id="button-todo" type="button" className="btn btn-outline-success mb-3" onClick={addTodo}>Add task</button>
                        <div id="todobox" className="border rounded p-2 overflow-auto" style={{ height: "330px", background: "#fffaf4" }}>
                            <ul className="list-group">
                                {todos.map((todo, index) => (
                                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                        {todo}
                                        <button className="btn btn-danger btn-sm" onClick={() => deleteTodo(index)}>Delete</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button id="deleteAllBtn" type="button" className="btn btn-danger mt-3">Delete All</button>
                    </div>
                </div>
            </div>

            {isDeleting && <div className="modal" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete element this element?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" id='deleteConfirmation' className="btn btn-primary">Yes, Delete</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}
