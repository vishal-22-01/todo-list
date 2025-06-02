import React, { useState } from "react";
import Logo from "../assets/images/notes.png";

const Repeat = () => {
  const [task, setTask] = useState([]);

  //   const handleImage = ((e)=>{

  //   })

  return (
    <>
      <div className="main_container">
        <div className="todo_app">
          <div className="heading">
            <span>Todo list 2</span>
            <img src={Logo} alt="" />
          </div>
          <div className="inputArea">
            <input type="text" placeholder="Add Task" />
            <input type="file" />
            <input type="date" />
            <select name="" id="">
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Complete">Complete</option>
            </select>
            <button>Add Task</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Repeat;
