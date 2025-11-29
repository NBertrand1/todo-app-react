function TodoList({ todos, onDelete, onEdit }) {

    return (
        <div>
            <input type="search" name="search-bar" id="" placeholder="Rechercher une tache" className="ml-5 rounded-2xl p-4 border-s-amber-950" />
            {/* Liste des tâches */}
            {todos.length > 0 && (
                <ul className="grid grid-cols-1 gap-4 md: w-2xl justify-center">
                    {todos.map((todo) => (
                        <li key={todo.id}>
                            <article className='border-amber-700 rounded-2xl p-4 m-4 border-2 flex place-items-center justify-between bg-base-100 shadow-xl'>
                                <div className='flex flex-col w-full'>
                                    <h2 className="text-xl font-bold">{todo.name}</h2>
                                    <p className="text-gray-600">{todo.description}</p>
                                    <div className='flex gap-3 mt-2 text-sm'>
                                        <span className="badge badge-primary">Priorité: {todo.priority}</span>
                                        <span className="badge badge-secondary">{todo.statut || "Statut non défini"}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 ml-4">
                                    <button
                                        className="btn btn-sm btn-info"
                                        onClick={() => onEdit(todo)}
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        className="btn btn-sm btn-error"
                                        onClick={() => onDelete(todo.id)}
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </article>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TodoList;