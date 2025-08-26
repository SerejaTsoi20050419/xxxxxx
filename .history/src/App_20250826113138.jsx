import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]); // список задач
  const [filter, setFilter] = useState("all"); // all | active | completed
  const [newTask, setNewTask] = useState(""); // для инпута

  
