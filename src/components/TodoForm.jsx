import { useEffect, useState } from 'react'

const emptyTodo = { name: '', description: '', priority: '', statut: 'À faire' }

function TodoForm({ onAdd, editingTodo, onUpdate, onCancel }) {
  const [newTodo, setNewTodo] = useState(emptyTodo)

  useEffect(() => {
    setNewTodo(editingTodo ? { ...emptyTodo, ...editingTodo } : emptyTodo)
  }, [editingTodo])

  const handleChange = event => {
    const { name, value } = event.target
    setNewTodo(current => ({ ...current, [name]: value }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    const cleanedTodo = {
      ...newTodo,
      name: newTodo.name.trim(),
      description: newTodo.description.trim(),
      priority: newTodo.priority === '' ? '' : Number(newTodo.priority),
    }
    if (!cleanedTodo.name) return

    if (editingTodo) onUpdate(cleanedTodo)
    else onAdd({ ...cleanedTodo, id: Date.now() })

    setNewTodo(emptyTodo)
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto my-4 w-full rounded-xl bg-base-200 p-4 sm:p-6">
      <h2 className="mb-4 text-lg font-bold">{editingTodo ? 'Modifier la tâche' : 'Ajouter une tâche'}</h2>
      <section className="mx-auto flex w-full max-w-xl flex-col gap-3">
        <label className="form-control w-full">
          <span className="label-text mb-1">Nom de la tâche *</span>
          <input type="text" name="name" className="input input-bordered w-full" value={newTodo.name} onChange={handleChange} placeholder="Ex. Préparer le rapport" maxLength={100} required />
        </label>
        <label className="form-control w-full">
          <span className="label-text mb-1">Description</span>
          <textarea name="description" className="textarea textarea-bordered w-full" value={newTodo.description} onChange={handleChange} placeholder="Détails facultatifs" rows="2" maxLength={500} />
        </label>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="form-control w-full">
            <span className="label-text mb-1">Priorité</span>
            <input type="number" name="priority" className="input input-bordered w-full" value={newTodo.priority} onChange={handleChange} placeholder="1 = élevée" min="1" max="5" />
          </label>
          <label className="form-control w-full">
            <span className="label-text mb-1">Statut</span>
            <select name="statut" className="select select-bordered w-full" value={newTodo.statut} onChange={handleChange} required>
              <option value="À faire">À faire</option>
              <option value="En cours">En cours</option>
              <option value="Terminé">Terminé</option>
            </select>
          </label>
        </div>
      </section>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <button type="submit" className="btn btn-primary">{editingTodo ? 'Enregistrer' : '+ Ajouter'}</button>
        {editingTodo && <button type="button" className="btn btn-ghost" onClick={onCancel}>Annuler</button>}
      </div>
    </form>
  )
}

export default TodoForm
