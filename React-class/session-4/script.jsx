const { useState, useRef } = React;

const TodoItem = ({ content, todoId, onDeleteTask }) => {
  return (
    <li>
      <div className="content">{content}</div>
      <button
        className="btn danger delete"
        type="button"
        onClick={() => onDeleteTask(todoId)}
      >
        <i class="bi bi-trash"></i>
      </button>
    </li>
  );
};

const TodoList = ({ todos, onDeleteTask }) => {
  return (
    <ul className="todos-list">
      {todos.map((td) => (
        <TodoItem
          todoId={td.id}
          key={td.id}
          content={td.content}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </ul>
  );
};

const App = () => {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = inputRef.current.value;
    if (inputValue.trim().length === 0) return;

    const id = Math.random().toString();

    setTodos([{ content: inputValue, id }, ...todos]);
    inputRef.current.value = "";
  };

  const handleDeleteTodo = (todoId) => {
    const filteredTodos = todos.filter(({ id }) => id !== todoId);

    setTodos(filteredTodos);
  };

  const resetTodos = () => {
    setTodos([]);
  };

  return (
    <div className="app center-content">
      <div className="todo-container">
        <h1 className="heading">Simple Todo App</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-control">
            <input ref={inputRef} type="text" placeholder="Add new todo" />
            <button className="btn primary" type="submit">
              Add
            </button>
          </div>

          <TodoList todos={todos} onDeleteTask={handleDeleteTodo} />

          <div className="form-footer">
            <p>
              You have <strong>{todos.length}</strong> pending task
            </p>
            <button
              className="btn danger wide"
              type="button"
              onClick={resetTodos}
            >
              Clear all
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
