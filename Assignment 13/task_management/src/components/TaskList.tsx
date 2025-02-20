import { useContext, useState } from "react";
import { TaskContext } from "./TaskContext";

const TaskList = () => {
    const taskContext = useContext(TaskContext);

    if (!taskContext) {
        throw new Error("TaskList must be used within a TaskProvider");
    }

    const { tasks, addTask, removeTask, toggleTask, completedTaskCount } = taskContext;
    const [taskText, setTaskText] = useState("");

    const handleAddTask = () => {
        if (taskText.trim()) {
            const newTask = { id: Date.now(), text: taskText, completed: false };
            addTask(newTask);
            setTaskText("");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Task List</h2>
            <p className="text-center fw-bold">Completed Tasks: {completedTaskCount}</p>

            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                    placeholder="Enter task..."
                />
                <button className="btn btn-primary" onClick={handleAddTask}>Add Task</button>
            </div>

            <ul className="list-group">
                {tasks.map((task) => (
                    <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <span
                            className={task.completed ? "text-decoration-line-through" : ""}
                            onClick={() => toggleTask(task.id)}
                            style={{ cursor: "pointer" }}
                        >
                            {task.text}
                        </span>
                        <div>
                            <button className="btn btn-warning me-2" onClick={() => toggleTask(task.id)}>Toggle</button>
                            <button className="btn btn-danger" onClick={() => removeTask(task.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
