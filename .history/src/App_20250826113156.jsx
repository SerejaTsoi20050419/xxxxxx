import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]); // список задач
  const [filter, setFilter] = useState("all"); // all | active | completed
  const [newTask, setNewTask] = useState(""); // для инпута

    const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([
      ...tasks,
      { id: Date.now(), text: newTask, completed: false }
    ]);
    setNewTask("");
  };

   const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true; // "all"
  });

   const activeCount = tasks.filter(task => !task.completed).length;

     const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  
