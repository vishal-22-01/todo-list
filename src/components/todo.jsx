import React, { useEffect, useRef, useState } from "react";
import Logo from "../assets/images/notes.png";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("Pending");
  const [date, setDate] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [editImage, setEditImage] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [search, setSearch] = useState("");

  const fileRef = useRef(null);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem("todo");
      if (storedData) {
        setTodos(JSON.parse(storedData));
      }
    } catch (err) {
      console.log("Failed to load todos:", err);
    }
  }, []);

  const formatDateLabel = (taskDate) => {
    const today = new Date();
    const target = new Date(taskDate);

    const diffTime = target.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0);
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays === 0) return "Today";
    if (diffDays === -1) return "Yesterday";
    if (diffDays === 1) return "Tomorrow";
    return taskDate;
  };

  const addTask = () => {
    if (input.trim() === "" && image.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: input,
      image: image,
      status: status,
      date: date,
      done: false,
    };

    const updatedTodos = [...todos, newTask];
    setTodos(updatedTodos);
    localStorage.setItem("todo", JSON.stringify(updatedTodos));

    setInput("");
    setStatus("Pending");
    setDate("");
    setImage("");
    if (fileRef.current) fileRef.current.value = null;
  };

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

  const saveEditing = (id) => {
    if (editingText.trim() === "") return;

    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: editingText, image: editImage } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("todo", JSON.stringify(updatedTodos));
    setEditingId(null);
    setEditingText("");
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingText("");
  };

  const startEditing = (id, text, image) => {
    setEditingId(id);
    setEditingText(text);
    setEditImage(image);
  };

  const deleteTodo = (id) => {
    const deletedTask = todos.filter((todo) => todo.id !== id);
    setTodos(deletedTask);
    localStorage.setItem("todo", JSON.stringify(deletedTask));
  };


  // filter task by Date, tab and name
  const filteredTodos = todos.filter((todo) => {
    const matchTab = activeTab === "All" || todo.status === activeTab;
    const matchDate = filterDate === "" || todo.date === filterDate;
    const filterByName = todo.text.toLowerCase().includes(search.toLowerCase());

    return matchTab && matchDate && filterByName;
  });

  // Group filtered todos by date
  const groupedTodos = filteredTodos.reduce((acc, task) => {
    const dateKey = task.date || "No Date";
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(task);
    return acc;
  }, {});

  return (
    <div className="main_container">
      <div className="todo_app">
        <div className="heading">
          <span>Todo List</span>
          <img src={Logo} alt="Logo" />
        </div>

        <div className="inputArea">
          <input
            type="text"
            placeholder="Add Task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <input type="file" ref={fileRef} onChange={handleImageChange} />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Complete">Complete</option>
          </select>
          <button onClick={addTask}>Add</button>
          <input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* tabs */}
        <div className="tabs">
          {["All", "Pending", "In Progress", "Complete"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={activeTab === tab ? "active" : ""}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* filter the date */}
        <div className="filterDate">
          <label>Filter by Date: </label>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
          <button onClick={() => setFilterDate("")}>
            {filterDate ? "Clear" : ""}
          </button>
        </div>

        <ul className="taskList">
          {Object.entries(groupedTodos).map(([dateKey, todosForDate]) => (
            <li className="tasks" key={dateKey}>
              <div>
                <strong>{formatDateLabel(dateKey)}</strong>
              </div>
              <ul >
                {todosForDate.map((todo) => (
                  <li key={todo.id}>
                    {editingId === todo.id ? (
                      <>
                        <input
                          type="text"
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                        />
                        <img className="image" src={editImage} alt="" />
                        <input type="file" onChange={handleEditImage} />
                        <span>{todo.status}</span>
                        <button onClick={() => saveEditing(todo.id)}>
                          Save
                        </button>
                        <button onClick={cancelEditing}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <span
                          onDoubleClick={() =>
                            startEditing(todo.id, todo.text, todo.image)
                          }
                          title="Double click to edit"
                        >
                          {todo.text}
                        </span>
                        <img
                          className="image"
                          src={todo.image}
                          alt=""
                          style={{ width: "50px", height: "50px" }}
                        />
                        <span>{todo.status}</span>
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
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
