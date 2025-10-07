import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');



  const handleAddTask = () => {
    if (input.trim() !== '') {
      const now = new Date();
      const newTask = {
        id: Date.now(),
        text: input,
        completed: false,
        timestamp: now.toLocaleString(),
      };
      setTasks([...tasks, newTask]);
      setInput('');
    }
  };


  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="app-container">
      <div className="todo-box">
        <h1>To-Do List</h1>
        <div className="input-section">
          <input
            type="text"
            placeholder="Enter a task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleAddTask}>Add</button>
        </div>
        <ul className="task-list">
          {tasks.map(task => (
            <li key={task.id} className="task-item">
              <span
                className={task.completed ? 'completed' : ''}
                onClick={() => handleToggleComplete(task.id)}
              >
                {task.text}
              </span>
              <div className="timestamp">{task.timestamp}</div> {/* New line */}
              <button className="delete-btn" onClick={() => handleDeleteTask(task.id)}>
                ❌
              </button>
            </li>
          ))}

        </ul>
      </div>
    </div>
  );
}
