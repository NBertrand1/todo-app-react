import React, { useState, useEffect } from 'react'
import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'

function App() {

  //variables et leur state 
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [editingTodo, setEditingTodo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Save to LocalStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Theme management
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  //comportements
  const handleAddTodo = (taskToAdd) => {
    setTodos([...todos, taskToAdd]);
  }

  const handleSearch = (term) => {
    setSearchTerm(term);
  }

  const filteredTodos = todos.filter(todo =>
    todo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    todo.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
  }

  const handleUpdateTodo = (updatedTodo) => {
    setTodos(todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo));
    setEditingTodo(null); // Close edit mode
  }

  // 3. AFFICHAGE
  return (
    <>
      <section className="container mx-auto place-items-center">
        <header className="flex justify-between items-center w-full max-w-2xl p-4 mt-4">
          <h1 className='text-4xl font-bold'>To-do App</h1>
          <button className="btn btn-circle btn-ghost" onClick={toggleTheme}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </header>
        <p className='text-center text-gray-600'>Ajoutez vos tâches et garez-les en mémoire avec notre application To-do.</p>
        <div className='flex flex-col gap-4 p-4 md:p-8 w-full max-w-4xl'>
          <TodoList
            todos={filteredTodos}
            onDelete={handleDeleteTodo}
            onEdit={handleEditTodo}
            onSearch={handleSearch}
          />
          <TodoForm
            onAdd={handleAddTodo}
            editingTodo={editingTodo}
            onUpdate={handleUpdateTodo}
          />
        </div>
      </section>
    </>
  )
}

export default App
