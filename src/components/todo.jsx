import React, { useEffect, useRef, useState } from "react";
import Logo from "../assets/images/notes.png";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [image, setImage] = useState("");
  const [editingId, setEditinId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [editImage, setEditImage] = useState("");

  console.log(todos);
  console.log(editingText);
  console.log(editImage);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem("todo");
      if (storedData) {
        setTodos(JSON.parse(storedData));
      }
    } catch (err) {
      console.log("failed", err);
    }
  }, []);

  const addTask = () => {
    if (input.trim() === "" && image.trim() === "") return;
    setTodos([
      ...todos,
      { id: Date.now(), text: input, image: image, done: false },
    ]);
    localStorage.setItem(
      "todo",
      JSON.stringify([
        ...todos,
        { id: Date.now(), text: input, image: image, done: false },
      ])
    );
    setInput("");
    setImage((fileRef.current.value = null));
  };

  const fileRef = useRef(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleEditImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      setEditImage(URL.createObjectURL(e.target.files[0]));
    }
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
        todo.id === id ? { ...todo, text: editingText, image: editImage } : todo
      )
    );
    setEditinId(null);
    setEditingText("");
  };
  const cancelEditing = () => {
    setEditinId(null);
    setEditingText("");
  };

  const startEditing = (id, text, image) => {
    setEditinId(id);
    setEditingText(text);
    setEditImage(image);
  };

  const deleteTodo = (id) => {
    const deletedTask = todos.filter((todo) => todo.id !== id);
    setTodos(deletedTask);
    localStorage.setItem("todo", JSON.stringify(deletedTask));
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
            <input type="file" ref={fileRef} onChange={handleImageChange} />
            <button onClick={addTask}>Add</button>
          </div>
          <ul className="taskList">
            {todos.map((todo) => {
              // console.log(todo);

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
                      <img
                        className="image"
                        src={todo.image}
                        alt=""
                        value={editImage}
                        onChange={() => handleEditImage}
                      />
                      <input type="file" onChange={handleEditImage} />
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
                      <img className="image" src={todo.image} alt="" />
                      <button
                        onClick={() =>
                          startEditing(todo.id, todo.text, todo.image)
                        }
                      >
                        Edit
                      </button>
                      <button onClick={() => deleteTodo(todo.id)}>
                        Delete
                      </button>
                    </>
                  )}
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
