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

  // Save to LocalStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  //comportements
  const handleAddTodo = (taskToAdd) => {
    setTodos([...todos, taskToAdd]);
  }

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
        <header>
          <h1 className='text-4xl text-center p-2 mt-4 font-bold'>To-do App</h1>
        </header>
        <p className='text-center text-gray-600'>Ajoutez vos tâches et garez-les en mémoire avec notre application To-do.</p>
        <div className='flex flex-col gap-4 m-8'>
          <TodoList
            todos={todos}
            onDelete={handleDeleteTodo}
            onEdit={handleEditTodo}
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
