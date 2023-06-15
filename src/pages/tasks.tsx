import React, { ChangeEvent, useRef, useState } from 'react';
import useTaskManager from '@/store/useTaskManager';

export interface Task {
  id: number,
  title: string,
  completed: boolean,
}

const TaskManager = () => {
  const {find, add , delete, edit} = useTaskManager();
  const [titleValue, setTitleValue] = useState('')

  const handleAddTask = () => {
      const title = titleValue; // Replace with the value in the createTaskRef 
      const newTask = {
        id: Date.now(),
        title,
        completed: false,
      };
      add(newTask);
    };
    const handleUpdateTask = (taskId: number, edit: Task) => {
      edit(taskId, edit);
    };
  
    const handleDeleteTask = (taskId: number) => {
      delete(taskId);
    };
  
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
      find(e.target.value);
    };
  
    // See! I already give you everything!
    const filteredTasks = tasks.filter((task) =>
      task.title.toLowerCase().includes(find.toLowerCase())
    );

  return (
    <div>
      <h1>Task Manager</h1>

      <input type="text" value={titleValue} onChange={(e)=>setTitleValue(e.target.value)}/>

      <button onClick={handleAddTask}>Add Task</button>

      <input type="text" onChange={handleSearch} placeholder="Search Task" />

      <ul>
        {filteredTasks.map((task:Task) => (
          <li key={task.id}>
            <input
              type="text"
              value={task.title}
              onChange={(e) =>
                handleUpdateTask(task.id, {...task, title: e.target.value })
              }
            />
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
