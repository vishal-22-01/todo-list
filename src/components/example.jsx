import React, { useState } from "react";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Add new todo
  const addTodo = () => {
    if (input.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: input, done: false }]);
    setInput("");
  };

  // Toggle done status
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Start editing a todo
  const startEditing = (id, currentText) => {
    setEditingId(id);
    setEditingText(currentText);
  };

  // Save edited todo
  const     saveEditing = (id) => {
    if (editingText.trim() === "") return; // Prevent empty todo text
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editingText } : todo
      )
    );
    setEditingId(null);
    setEditingText("");
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
    setEditingText("");
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "20px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2>Todo App with Edit</h2>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add new todo"
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          style={{ padding: 8, width: "70%" }}
        />
        <button
          onClick={addTodo}
          style={{ padding: "8px 16px", marginLeft: 8 }}
        >
          Add
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0, marginTop: 20 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{ marginBottom: 10, display: "flex", alignItems: "center" }}
          >
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
            />

            {editingId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveEditing(todo.id);
                    if (e.key === "Escape") cancelEditing();
                  }}
                  style={{ marginLeft: 10, flexGrow: 1, padding: 4 }}
                  autoFocus
                />
                <button
                  onClick={() => saveEditing(todo.id)}
                  style={{ marginLeft: 8 }}
                >
                  Save
                </button>
                <button onClick={cancelEditing} style={{ marginLeft: 4 }}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span
                  style={{
                    marginLeft: 10,
                    textDecoration: todo.done ? "line-through" : "none",
                    flexGrow: 1,
                    cursor: "pointer",
                  }}
                  onDoubleClick={() => startEditing(todo.id, todo.text)}
                  title="Double click to edit"
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => startEditing(todo.id, todo.text)}
                  style={{ marginLeft: 8 }}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  style={{ marginLeft: 4 }}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
