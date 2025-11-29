import React, { useState } from 'react'
import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'

function App() {

  //variables et leur state 
  const [todos, setTodos] = useState([]);

  //comportements
  const handleAddTodo = (taskToAdd) => {
    setTodos([...todos, taskToAdd]);
  }

  // 3. AFFICHAGE
  return (
    <>
      <section className="container mx-auto place-items-center">
        <header>
          <h1 className='text-4xl text-center p-2 mt-4 font-bold'>To-do App</h1>
        </header>
        <TodoList todos={todos} />
        <TodoForm onAdd={handleAddTodo} />
      </section>
    </>
  )
}

export default App
