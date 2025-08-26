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
