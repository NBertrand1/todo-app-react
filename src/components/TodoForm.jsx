import { useState } from 'react';

function TodoForm({ onAdd }) {

  const [newTodo, setNewTodo] = useState({ name: "", description: "", priority: '', statut: "" });

  //comportements
  const handleSubmit = (event) => {
    event.preventDefault();
    const taskToAdd = { ...newTodo, id: Date.now() };
    onAdd(taskToAdd);
    setNewTodo({ name: "", description: "", priority: '', statut: "" });
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setNewTodo(prevTodo => ({ ...prevTodo, [name]: value }));
  };

  return (
    <>
      {/* Formulaire d'ajout */}
      <form onSubmit={handleSubmit} className='place-items-center p-4 bg-gray-100 rounded-xl m-4 md:w-xl'>
        <section className='space-y-2 flex flex-col w-full max-w-md mx-auto'>
          {/* The name attribute is indispensable for handleChange because it allows the function to dynamically update the corresponding property in the state object based on the input field's name. */}
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
            min="1"
          />
          <select
            name="statut"
            className='select select-bordered w-full'
            value={newTodo.statut}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Choisir un statut</option>
            <option value="En cours">En cours</option>
            <option value="Terminé">Terminé</option>
            <option value="À faire">À faire</option>
          </select>
        </section>

        <div className="flex justify-center mt-4">
          <button type="submit" className='btn btn-primary'>
            + Ajouter une tâche
          </button>
        </div>
      </form>
    </>
  );
}

export default TodoForm;