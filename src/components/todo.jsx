import React, { useState } from "react";
import Logo from "../assets/images/notes.png";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditinId] = useState(null);
  const [editingText, setEditingText] = useState("");
  console.log(input);

  const addTask = () => {
    if (input.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: input, done: false }]);
    setInput("");
  };

  const toggleCheck = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const saveEditing = (id) => {
    if (editingText.trim() === "") return;
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editingText } : todo
      )
    );
    setEditinId(null);
    setEditingText("");
  };
  const cancelEditing = () => {
    setEditinId(null);
    setEditingText("");
  };

  const startEditing = (id, text) => {
    setEditinId(id);
    setEditingText(text);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  return (
    <>
      <div className="main_container">
        <div className="todo_app">
          <div className="heading">
            <span>Todo List</span>
            <img src={Logo} alt="logo" />
          </div>
          <div className="inputArea">
            <input
              type="text"
              placeholder="Add Task"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={addTask}>Add</button>
          </div>
          <ul className="taskList">
            {todos.map((todo) => {
              console.log(todo);

              return (
                <li key={todo.id}>
                  <input
                    type="checkbox"
                    onChange={() => toggleCheck(todo.id)}
                    checked={todo.done}
                  />
                  {editingId === todo.id ? (
                    <>
                      <input
                        type="text"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                      />
                      <button onClick={() => saveEditing(todo.id)}>Save</button>
                      <button onClick={cancelEditing}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <span
                        onDoubleClick={() => startEditing(todo.id, todo.text)}
                        title="Double click to edit"
                      >
                        {todo.text}
                      </span>
                      <button onClick={() => startEditing(todo.id, todo.text)}>
                        Edit
                      </button>
                      <button onClick={() => deleteTodo(todo.id)}>
                        Delete
                      </button>
                    </>
                  )}
                  {/* <p>{todo.text}</p> */}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Todo;
