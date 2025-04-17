import React from 'react';

const TodoItem = ({ todo, toggle, remove, edit, save, editing, editText, setEditText }) => {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <span className={`circle-icon ${todo.completed ? 'done' : ''}`}></span>
      {editing ? (
        <input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && save(todo.id)}
        />
      ) : (
        <span onClick={toggle} className="todo-text">{todo.text}</span>
      )}

      <div className="actions">
        {editing ? (
          <button onClick={() => save(todo.id)}>💾</button>
        ) : (
          <button onClick={edit}>✏️</button>
        )}
        <button onClick={remove}>🗑️</button>
      </div>
    </div>
  );
};

export default TodoItem;
