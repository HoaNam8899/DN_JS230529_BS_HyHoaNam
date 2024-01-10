import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';

interface ITask {
  content: string,
  // iduser: number,
}
interface Tasks {
  id: number,
  content: string
}

function App() {
  const [newTask, setNewTask] = React.useState<ITask>();
  const [tasks, setTasks] = React.useState<Tasks[]>();

  const handleGetAllTask = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/tasks");
      const data = await response.json();
      setTasks(data);
    }
    catch (err) {
      console.log(err)
    }
  };

  const handlleOnchangeInput = (e: React.FormEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    setNewTask({ content: value })
  };

  const handlleAddTask = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/tasks", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },

        body: JSON.stringify(newTask)
      }
      )
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      console.log(err)
    }
  };

  const handlleDelete = async (e: React.MouseEvent) => {
    const target = e.currentTarget.id;
    try {
      const response = await fetch(`http://localhost:3000/api/v1/tasks/${target}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();
      setTasks(data);
    }
    catch (err) {
      console.log(err)
    }
  }

  const handlleGetCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget.value;
    console.log(target)
  }

  useEffect(() => {
    handleGetAllTask();
  })
  return (
    <>
      <div className='task-table'>
        <div className='header'>
          <h1>Todo list</h1>
          <h5>Get thing done, one item at the time</h5>
        </div>
        <div className='content'>
          {tasks?.map((item, index) =>
            <div className='item' key={index}>
              <h4 className='item-content'>{item.content}</h4>
              <div className='item-active'>
                <input type="checkbox" onChange={handlleGetCheckbox} />
                <span id={String(item.id)} onClick={handlleDelete}>x</span>
              </div>
            </div>
          )}
          <div className='content-footer'>
            <h5>move done tasks at the and?</h5>
            <input type="checkbox" />
          </div>
        </div>
        <div className='footer'>
          <h2>Add tasks</h2>
          <div className='add-tasks'>
            <input type="text" onChange={handlleOnchangeInput} />
            <button onClick={handlleAddTask}>ok</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
