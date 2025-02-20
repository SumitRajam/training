import React, { createContext, useReducer, useMemo, useCallback, useEffect } from "react";

interface Task {
    id: number;
    text: string;
    completed: boolean;
}

type TaskAction = { type: "ADD_TASK"; task: Task } | { type: "REMOVE_TASK"; taskId: number } | { type: "TOGGLE_TASK"; taskId: number } | { type: "LOAD_TASKS"; tasks: Task[] };

const tasksReducer = (state: Task[], action: TaskAction): Task[] => {
    switch (action.type) {
        case "ADD_TASK":
            return [...state, action.task];
        case "REMOVE_TASK":
            return state.filter(task => task.id !== action.taskId);
        case "TOGGLE_TASK":
            return state.map(task =>
                task.id === action.taskId ? { ...task, completed: !task.completed } : task
            );
        case "LOAD_TASKS":
            return action.tasks;
        default:
            return state;
    }
};

interface TaskContextType {
    tasks: Task[];
    addTask: (task: Task) => void;
    removeTask: (taskId: number) => void;
    toggleTask: (taskId: number) => void;
    completedTaskCount: number;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tasks, dispatch] = useReducer(tasksReducer, [], () => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = useCallback((task: Task) => {
        dispatch({ type: "ADD_TASK", task });
    }, []);

    const removeTask = useCallback((taskId: number) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            dispatch({ type: "REMOVE_TASK", taskId });
        }
    }, []);

    const toggleTask = useCallback((taskId: number) => {
        dispatch({ type: "TOGGLE_TASK", taskId });
    }, []);

    const completedTaskCount = useMemo(() => tasks.filter(task => task.completed).length, [tasks]);

    return (
        <TaskContext.Provider value={{ tasks, addTask, removeTask, toggleTask, completedTaskCount }}>
            {children}
        </TaskContext.Provider>
    );
};
