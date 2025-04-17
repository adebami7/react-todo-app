import React, { useState, useEffect } from 'react';
import TodoItem from './components/TodoItem';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem('todos');
    return stored ? JSON.parse(stored) : [];
  });
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  const completedCount = todos.filter(todo => todo.completed).length;

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, {
      id: Date.now(),
      text: input,
      completed: false
    }]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => todo.id === id ? {
      ...todo,
      completed: !todo.completed
    } : todo));
  };

  const deleteTodo = (id) => setTodos(todos.filter(todo => todo.id !== id));

  const handleEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const saveEdit = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: editText } : todo
    ));
    setEditId(null);
    setEditText('');
  };

  const [theme, setTheme] = useState("light");

useEffect(() => {
  document.body.className = theme === "dark" ? "dark" : "";
}, [theme]);

const toggleTheme = () => {
  setTheme((prev) => (prev === "light" ? "dark" : "light"));
};


  return (
    <div className="app">
      <h1>✅ TODO
      <button onClick={toggleTheme} style={{ float: 'right', marginBottom: '10px' }}>
   {theme === "light" ? "Dark" : "Light"} 
</button>
      </h1>
      


      <div className="task-status">
        <div className="task-text">
          <p>Task Done</p>
          <strong>Keep it up</strong>
        </div>
        <div className="circle">
          {completedCount}/{todos.length || 1}
        </div>
      </div>

      <div className="input-bar">
        <input
          type="text"
          placeholder="Write your next task"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button onClick={addTodo}>＋</button>
      </div>

      <div className="todo-list">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggle={() => toggleTodo(todo.id)}
            remove={() => deleteTodo(todo.id)}
            edit={() => handleEdit(todo.id, todo.text)}
            save={() => saveEdit(todo.id)}
            editing={editId === todo.id}
            editText={editText}
            setEditText={setEditText}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
