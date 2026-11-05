function TodoList({ todos, onDelete, onEdit, onSearch }) {
  return (
    <section className="flex w-full flex-col items-center gap-4" aria-label="Liste des tâches">
      <input
        type="search"
        name="search-bar"
        id="search-bar"
        placeholder="Rechercher une tâche"
        aria-label="Rechercher une tâche"
        className="input input-bordered w-full max-w-2xl"
        onChange={event => onSearch(event.target.value)}
      />
      {todos.length === 0 ? (
        <p className="w-full rounded-xl border border-dashed border-base-300 p-8 text-center text-base-content/60">
          Aucune tâche à afficher. Ajoutez une tâche ou modifiez votre recherche.
        </p>
      ) : (
        <ul className="grid w-full grid-cols-1 gap-3">
          {todos.map(todo => (
            <li key={todo.id}>
              <article className="flex w-full flex-col gap-4 rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <h2 className="break-words text-lg font-bold">{todo.name}</h2>
                  {todo.description && <p className="mt-1 break-words text-sm text-base-content/70">{todo.description}</p>}
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    {todo.priority !== '' && todo.priority != null && <span className="badge badge-primary">Priorité : {todo.priority}</span>}
                    <span className="badge badge-secondary">{todo.statut || 'À faire'}</span>
                  </div>
                </div>
                <div className="flex shrink-0 gap-2 sm:flex-col">
                  <button className="btn btn-sm btn-info" type="button" onClick={() => onEdit(todo)}>Modifier</button>
                  <button className="btn btn-sm btn-error btn-outline" type="button" onClick={() => onDelete(todo.id)}>Supprimer</button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default TodoList
