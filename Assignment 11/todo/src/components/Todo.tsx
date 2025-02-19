import { useState, useEffect } from 'react';

export default function Todo() {
    const [todos, setTodos] = useState<string[]>(
        localStorage.getItem('storedTodos') ? JSON.parse(localStorage.getItem('storedTodos')!) : []
    );
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [newTodoInput, setNewTodoInput] = useState("");
    const [editInput, setEditInput] = useState("");
    const [todoToDelete, setTodoToDelete] = useState<number>();

    useEffect(() => {
        localStorage.setItem('storedTodos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = () => {
        if (newTodoInput.trim() !== '') {
            setTodos((prevTodos) => [...prevTodos, newTodoInput]);
            setNewTodoInput("");
        }
    };

    const deleteTodoIndex = (index: number) => {
        setTodoToDelete(index);
        setIsDeleting(true);
    };

    const confirmDelete = () => {
        setTodos((prevTodos) => prevTodos.filter((_, i) => i !== todoToDelete));
        setIsDeleting(false);
    };

    const deleteAllTodos = () => {
        if (window.confirm("Are you sure you want to delete all tasks?"))
            setTodos([]);
    };

    const startEditing = (index: number) => {
        setIsEditing(index);
        setEditInput(todos[index]);
    };

    const updateTodo = (index: number) => {
        let updatedTodos = [...todos];
        updatedTodos[index] = editInput;
        setTodos(updatedTodos);
        setIsEditing(null);
        setEditInput("");
    };

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center p-5">
                <div className="card shadow-lg rounded" style={{ height: "580px", minWidth: "350px" }}>
                    <div className="card-body d-flex flex-column">
                        <h2 className="text-center mb-3">Todo List</h2>

                        <input
                            type="text"
                            id="input-todo"
                            className="form-control mb-3"
                            value={newTodoInput}
                            onChange={(e) => setNewTodoInput(e.target.value)}
                            placeholder="Enter task"
                        />
                        <button
                            id="button-todo"
                            type="button"
                            className="btn btn-outline-success mb-3"
                            onClick={addTodo}
                        >
                            Add task
                        </button>

                        <div id="todobox" className="border rounded p-2 overflow-auto" style={{ height: "330px", background: "#fffaf4" }}>
                            <ul className="list-group">
                                {todos.map((todo, index) => (
                                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                        {isEditing === index ? (
                                            <input
                                                type="text"
                                                value={editInput}
                                                onChange={(e) => setEditInput(e.target.value)}
                                                className="form-control"
                                            />
                                        ) : (
                                            todo
                                        )}
                                        <div>
                                            {isEditing === index ? (
                                                <button className="btn btn-success btn-sm me-2" onClick={() => updateTodo(index)}>
                                                    Save
                                                </button>
                                            ) : (
                                                <button className="btn btn-warning btn-sm me-2" onClick={() => startEditing(index)}>
                                                    Edit
                                                </button>
                                            )}
                                            <button className="btn btn-danger btn-sm" onClick={() => deleteTodoIndex(index)}>
                                                Delete
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button id="deleteAllBtn" type="button" onClick={deleteAllTodos} className="btn btn-danger mt-3">
                            Delete All
                        </button>
                    </div>
                </div>
            </div>

            {isDeleting && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                    style={{ zIndex: 50 }}
                >
                    <div className="bg-white p-4 rounded shadow-lg" style={{ width: "320px" }}>
                        <h5 className="text-center">Delete Confirmation</h5>
                        <p className="text-center">Are you sure you want to delete this task?</p>
                        <div className="d-flex justify-content-between mt-3">
                            <button className="btn btn-danger w-50 me-2" onClick={confirmDelete}>
                                Delete
                            </button>
                            <button className="btn btn-secondary w-50" onClick={() => setIsDeleting(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
