function TodoList({ todos }) {
    return (
        <div>
            {/* Liste des tâches */}
            {todos.length > 0 && (
                <ul className="grid grid-cols-1 gap-4 md: w-2xl justify-center">
                    {todos.map((todo) => (
                        <li key={todo.id}>
                            <article className='border-amber-700 rounded-2xl p-4 m-4 border-2 flex place-items-center  bg-base-100 shadow-xl'>
                                <div className='flex flex-col w-full'>
                                    <h2 className="text-xl font-bold">{todo.name}</h2>
                                    <p className="text-gray-600">{todo.description}</p>
                                    <div className='flex gap-3 mt-2 text-sm'>
                                        <span className="badge badge-primary">Priorité: {todo.priority}</span>
                                        <span className="badge badge-secondary">{todo.statut || "Statut non défini"}</span>
                                    </div>
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