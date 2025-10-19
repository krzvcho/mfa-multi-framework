import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([
    { id: 1, text: "Build React component", completed: true },
    { id: 2, text: "Integrate with Module Federation", completed: true },
    { id: 3, text: "Deploy as remote app", completed: false },
  ]);

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="react-remote-app">
      <div className="app-header">
        <h2>⚛️ React Remote Application</h2>
        <p className="framework-badge react-badge">React 18.2.0</p>
      </div>

      <div className="content-grid">
        <div className="card">
          <h3>🎯 Counter Demo</h3>
          <div className="counter-section">
            <div className="counter-display">{count}</div>
            <div className="counter-buttons">
              <button onClick={() => setCount(count - 1)} className="btn btn-danger">
                - Decrement
              </button>
              <button onClick={() => setCount(0)} className="btn btn-secondary">
                Reset
              </button>
              <button onClick={() => setCount(count + 1)} className="btn btn-success">
                + Increment
              </button>
            </div>
          </div>
        </div>

        <div className="card">
          <h3>✅ Todo List</h3>
          <div className="todo-list">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className={`todo-item ${todo.completed ? "completed" : ""}`}
                onClick={() => toggleTodo(todo.id)}
              >
                <span className="todo-checkbox">
                  {todo.completed ? "✓" : "○"}
                </span>
                <span className="todo-text">{todo.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="info-section">
        <h3>🔧 Technical Details</h3>
        <ul>
          <li>Framework: React 18 with Hooks</li>
          <li>State Management: useState Hook</li>
          <li>Bundler: Webpack 5 with Module Federation</li>
          <li>Port: 3001</li>
          <li>Exposed Module: ./App</li>
        </ul>
      </div>

      <div className="features">
        <div className="feature-badge">🔄 State Management</div>
        <div className="feature-badge">🎨 CSS Modules</div>
        <div className="feature-badge">📦 Module Federation</div>
        <div className="feature-badge">⚡ Hot Reload</div>
      </div>
    </div>
  );
};

export default App;
