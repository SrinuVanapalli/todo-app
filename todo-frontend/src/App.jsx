
import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:8080/api/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);

  async function loadTodos() {
    try {
      setError("");
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Could not load tasks. Check your backend.");
      }

      const data = await response.json();
      setTodos(Array.isArray(data) ? data : data.content ?? []);
    } catch (err) {
      setError(err.message || "Could not connect to the backend.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchTodos() {
      await loadTodos();
    }

    fetchTodos();
  }, []);

  function resetForm() {
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("MEDIUM");
    setEditingId(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) {
      setError("Please enter a task title.");
      return;
    }

    const todo = {
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate || null,
      priority,
      completed:
          editingId !== null
              ? Boolean(todos.find((item) => item.id === editingId)?.completed)
              : false,
    };

    try {
      setError("");

      const response = await fetch(
          editingId !== null ? `${API_URL}/${editingId}` : API_URL,
          {
            method: editingId !== null ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(todo),
          }
      );

      if (!response.ok) {
        throw new Error("Could not save task. Check the API and required fields.");
      }

      resetForm();
      await loadTodos();
    } catch (err) {
      setError(err.message || "Could not save task.");
    }
  }

  function startEditing(todo) {
    setEditingId(todo.id);
    setTitle(todo.title ?? "");
    setDescription(todo.description ?? "");
    setDueDate(todo.dueDate ?? "");
    setPriority(todo.priority ?? "MEDIUM");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function toggleCompleted(todo) {
    try {
      setError("");

      const response = await fetch(`${API_URL}/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...todo,
          completed: !todo.completed,
        }),
      });

      if (!response.ok) {
        throw new Error("Could not update task status.");
      }

      await loadTodos();
    } catch (err) {
      setError(err.message || "Could not update task.");
    }
  }

  async function deleteTodo(id) {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      setError("");

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Could not delete task.");
      }

      await loadTodos();
    } catch (err) {
      setError(err.message || "Could not delete task.");
    }
  }

  const completedCount = todos.filter((todo) => todo.completed).length;
  const pendingCount = todos.length - completedCount;

  return (
      <main className="app">
        <header className="header">
          <div>
            <p className="eyebrow">YOUR PERSONAL WORKSPACE</p>
            <h1>My Tasks<span>.</span></h1>
            <p className="subtitle">Plan your day. Get things done.</p>
          </div>
          <div className="task-total">
            <strong>{todos.length}</strong>
            <span>Total tasks</span>
          </div>
        </header>

        <section className="stats">
          <article className="stat-card">
            <span>Total tasks</span>
            <strong>{todos.length}</strong>
          </article>
          <article className="stat-card">
            <span>Pending</span>
            <strong>{pendingCount}</strong>
          </article>
          <article className="stat-card">
            <span>Completed</span>
            <strong>{completedCount}</strong>
          </article>
        </section>

        <section className="panel">
          <h2>{editingId !== null ? "Edit task" : "Create a task"}</h2>

          <form onSubmit={handleSubmit} className="todo-form">
            <label>
              Task title *
              <input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="What do you need to do?"
                  required
              />
            </label>

            <label>
              Description
              <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Add some details..."
                  rows="3"
              />
            </label>

            <div className="form-row">
              <label>
                Due date
                <input
                    type="date"
                    value={dueDate}
                    onChange={(event) => setDueDate(event.target.value)}
                />
              </label>

              <label>
                Priority
                <select
                    value={priority}
                    onChange={(event) => setPriority(event.target.value)}
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </label>
            </div>

            <div className="form-actions">
              <button className="primary-button" type="submit">
                {editingId !== null ? "Save changes" : "+ Add task"}
              </button>

              {editingId !== null && (
                  <button
                      className="secondary-button"
                      type="button"
                      onClick={resetForm}
                  >
                    Cancel
                  </button>
              )}
            </div>
          </form>
        </section>

        {error && <p className="error-message">{error}</p>}

        <section className="task-section">
          <div className="section-heading">
            <h2>Your task list</h2>
            <span>{todos.length} tasks</span>
          </div>

          {loading ? (
              <p className="empty-state">Loading tasks...</p>
          ) : todos.length === 0 ? (
              <p className="empty-state">
                No tasks yet. Add your first task above!
              </p>
          ) : (
              <div className="task-list">
                {todos.map((todo) => (
                    <article className="todo-card" key={todo.id}>
                      <input
                          className="complete-checkbox"
                          type="checkbox"
                          checked={Boolean(todo.completed)}
                          onChange={() => toggleCompleted(todo)}
                          aria-label={`Mark ${todo.title} as completed`}
                      />

                      <div className="todo-details">
                        <h3 className={todo.completed ? "completed-title" : ""}>
                          {todo.title}
                        </h3>
                        {todo.description && <p>{todo.description}</p>}
                        <div className="todo-meta">
                    <span className={`priority ${String(todo.priority ?? "MEDIUM").toLowerCase()}`}>
                      {todo.priority ?? "MEDIUM"}
                    </span>
                          {todo.dueDate && <span>Due: {todo.dueDate}</span>}
                        </div>
                      </div>

                      <div className="todo-actions">
                        <button
                            className="secondary-button"
                            onClick={() => startEditing(todo)}
                        >
                          Edit
                        </button>
                        <button
                            className="delete-button"
                            onClick={() => deleteTodo(todo.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </article>
                ))}
              </div>
          )}
        </section>
      </main>
  );
}

export default App;
