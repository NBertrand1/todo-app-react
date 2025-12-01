function TodoList({ todos, onDelete, onEdit, onSearch }) {

    return (
        <div className="flex flex-col place-items-center p-4 w-full">
            <div>
                <input
                    type="search"
                    name="search-bar"
                    id=""
                    placeholder="Rechercher une tache"
                    className="shadow-xl p-4 border-s-amber-950 w-full max-w-md"
                    onChange={(e) => onSearch(e.target.value)}
                />
            </div>
            {/* Liste des tâches */}
            {todos.length > 0 && (
                <ul className="grid grid-cols-1 md:gap-4 w-full max-w-2xl justify-center">
                    {todos.map((todo) => (
                        <li key={todo.id}>
                            <article className='border-amber-700 rounded-2xl p-4 my-4 border-2 flex flex-col md:flex-row bg-base-100 shadow-xl w-full'>
                                <div className='flex flex-col md:w-full'>
                                    <h2 className="text-xl font-bold">{todo.name}</h2>
                                    <p className="text-gray-600">{todo.description}</p>
                                    <div className='flex gap-3 mt-2 text-sm'>
                                        <span className="badge badge-primary">Priorité: {todo.priority}</span>
                                        <span className="badge badge-secondary">{todo.statut || "Statut non défini"}</span>
                                    </div>
                                </div>
                                <div className="flex flex-row md:flex-col gap-2 mt-4 md:mt-0 md:ml-4 justify-end shrink-0">
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