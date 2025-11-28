import React, { useState } from 'react'
//import img from "./assets/img.jpg"

function App() {
  
  //variables et leur state 
const [todos, setTodos] = useState([{ name: "", description: "", priority: 0, statut: ""}]);
const [newTodo, setNewTodo] = useState({ name: "", description: "", priority: 0, statut: ""});


  //comportements
  const handleSubmit = (event) =>{
    event.preventDefault();
    const taskToAdd = {...newTodo, id: Date.now()};
    setTodos([...todos, taskToAdd]);
    setNewTodo({ name: "", description: "", priority: 0, statut: ""});
  }

  const handleChange = (event) =>{
    const {name, value} = event.target
   setNewTodo(prevTodo => ({...prevTodo, [name]:value}));
  };

   // 3. AFFICHAGE
  return (
    <>
      <section className="container mx-auto place-items-center">
        <header>
          <h1 className='text-4xl text-center p-2 mt-4 font-bold'>To-do App</h1>
        </header>    
        
        {/* Liste des tâches */}
        <ul className="grid grid-cols-1 gap-4 md: w-2xl justify-center">
          {todos.map((todo) => (
            <li key={todo.id}>
              <article className='border-amber-700 rounded-2xl p-4 m-4 border-2 flex place-items-center  bg-base-100 shadow-xl'>
                <div className='flex flex-col w-full'>
                  <h2 className="text-xl font-bold">{todo.name}</h2>
                  <p className="text-gray-600">{todo.description}</p>
                  <div className='flex gap-3 mt-2 text-sm'>
                    <span className="badge badge-primary">Priorité: {todo.priority}</span>
                    <span className="badge badge-secondary">{todo.statut}</span>
                  </div>
                </div>
                <div></div>
              </article>
            </li>
          ))}
        </ul>

        {/* Formulaire d'ajout */}
        <form onSubmit={handleSubmit} className='place-items-center p-4 bg-gray-100 rounded-xl m-4 md: w-xl'>
          <section className='space-y-2 flex flex-col w-full max-w-md mx-auto'>
            {/* Ajout de l'attribut name="..." indispensable pour handleChange */}
            <input 
              type="text" 
              name="name" 
              className='input input-bordered w-full' 
              value={newTodo.name} 
              onChange={handleChange} 
              placeholder='Nom de la tâche'
              required 
            />
            <input 
              type="text" 
              name="description" 
              className='input input-bordered w-full' 
              value={newTodo.description} 
              onChange={handleChange} 
              placeholder='Description de la tâche' 
            />
            <input 
              type="number" 
              name="priority" 
              className='input input-bordered w-full' 
              value={newTodo.priority} 
              onChange={handleChange} 
              placeholder='Priorité' 
            />
            <input 
              type="text" 
              name="statut" 
              className='input input-bordered w-full' 
              value={newTodo.statut} 
              onChange={handleChange} 
              placeholder='Statut' 
            />
          </section>
          
          <div className="flex justify-center mt-4">
            <button type="submit" className='btn btn-primary'>
              + Ajouter une tâche
            </button>
          </div>
        </form>
      </section>
    </>
  )

}

export default App
