import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all"); // all | active | completed
  const [newTask, setNewTask] = useState("");

  // Добавление задачи
  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([
      ...tasks,
      { id: Date.now(), text: newTask.trim(), completed: false }
    ]);
    setNewTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true; // all
  });

  const activeCount = tasks.filter((task) => !task.completed).length;

  return (
    <div className="todo-app" style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h1>To-Do App</h1>

      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addTask()}
        placeholder="Введите задачу..."
        style={{ width: "70%", padding: "5px" }}
      />
      <button onClick={addTask} style={{ marginLeft: "10px" }}>
        Добавить
      </button>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            style={{
              display: "flex",
              alignItems: "center",
              margin: "8px 0"
            }}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                marginLeft: "8px",
                flexGrow: 1
              }}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)}>Удалить</button>
          </li>
        ))}
      </ul>

      {/* Нижняя панель */}
      {tasks.length > 0 && (
        <div
          className="footer"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px"
          }}
        >
          <span>{activeCount} задач осталось</span>

          <div>
            <button onClick={() => setFilter("all")}>Все</button>
            <button onClick={() => setFilter("active")} style={{ margin: "0 5px" }}>
              Активные
            </button>
            <button onClick={() => setFilter("completed")}>Завершенные</button>
          </div>

          <button onClick={clearCompleted}>Очистить завершенные</button>
        </div>
      )}
    </div>
  );
}

export default App;
