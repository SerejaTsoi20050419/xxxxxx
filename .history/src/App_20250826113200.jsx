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

  return (
  <div className="todo-app">
    {/* Добавление задач */}
    <input
      type="text"
      value={newTask}
      onChange={(e) => setNewTask(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && addTask()}
      placeholder="Введите задачу..."
    />
    <button onClick={addTask}>Добавить</button>

    {/* Список задач */}
    <ul>
      {filteredTasks.map((task) => (
        <li key={task.id}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() =>
              setTasks(
                tasks.map((t) =>
                  t.id === task.id ? { ...t, completed: !t.completed } : t
                )
              )
            }
          />
          {task.text}
          <button onClick={() => setTasks(tasks.filter((t) => t.id !== task.id))}>
            Удалить
          </button>
        </li>
      ))}
    </ul>

    {/* Нижняя панель */}
    <div className="footer">
      <span>{activeCount} задач осталось</span>

      <div className="filters">
        <button onClick={() => setFilter("all")}>Все</button>
        <button onClick={() => setFilter("active")}>Активные</button>
        <button onClick={() => setFilter("completed")}>Завершенные</button>
      </div>

      <button onClick={clearCompleted}>Очистить завершенные</button>
    </div>
  </div>
);
