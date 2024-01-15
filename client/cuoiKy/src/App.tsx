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
  const [newTask, setNewTask] = React.useState<ITask>({ content: "" });
  const [tasks, setTasks] = React.useState<Tasks[]>();
  const [update, setUpdate] = React.useState<Tasks>({ id: -1, content: '' });
  //getAll
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
  // post
  const handlleAddTask = async () => {
    if (newTask.content === "") {
      alert("chưa nhập nội dung tasks")
    } else {
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
        setNewTask({ content: "" })
      } catch (err) {
        console.log(err)
      }
    }

  };
  // delete
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
  // line-through
  const handlleGetCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget.checked;
    if (target === true) {
      e.currentTarget.parentElement?.parentElement?.getElementsByClassName('item-content')[0].classList.add('active');
    } else {
      e.currentTarget.parentElement?.parentElement?.getElementsByClassName('item-content')[0].classList.remove('active');
    }
  }
  // open input update
  const handleOpenUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    let idUpdate = e.currentTarget.parentElement?.getElementsByTagName('span')[0].id;
    setUpdate({
      id: +idUpdate!,
      content: ''
    });
    e.currentTarget.parentElement?.parentElement?.getElementsByClassName('update-tasks')[0].classList.remove('display-update');

  }
  // close input update
  const handleCloseUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.currentTarget.parentElement?.parentElement?.getElementsByClassName('update-tasks')[0].classList.add('display-update')
  }
  // content update
  const handlleOnchangeUpdate = (e: React.FormEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    setUpdate({
      id: update!.id,
      content: value
    })
  }
  // put
  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.parentElement?.classList.add('display-update');
    if (update.content === "") {
      alert("chưa thêm nội dung cho update")
    } else {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/tasks/${update.id}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(update)
        });
        const data = await response.json();
        setTasks(data);
      }
      catch (err) {
        console.log(err)
      }
    }
    setUpdate({
      id: -1,
      content: ""
    })
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
                <button className='update-btn' onClick={handleOpenUpdate}>update</button>
              </div>
              <div className='add-tasks update-tasks display-update'>
                <button className='close-update' onClick={handleCloseUpdate}>x</button>
                <input type="text" onChange={handlleOnchangeUpdate} value={update!.content} />
                <button onClick={handleUpdate}>Update</button>
              </div>
            </div>
          )}
          <div className='content-footer'>
            <h5>move done tasks at the end?</h5>
            <input type="checkbox" />
          </div>
        </div>
        <div className='footer'>
          <h2>Add tasks</h2>
          <div className='add-tasks'>
            <input type="text" onChange={handlleOnchangeInput} value={newTask.content} />
            <button onClick={handlleAddTask}>ok</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
