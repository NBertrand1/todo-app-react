import { useEffect, useMemo, useState } from 'react'
import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'

function readSavedTodos() {
  try {
    const saved = localStorage.getItem('todos')
    const parsed = saved ? JSON.parse(saved) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function App() {
  const [todos, setTodos] = useState(readSavedTodos)
  const [editingTodo, setEditingTodo] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || 'light'
    } catch {
      return 'light'
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos))
    } catch {
      // The app remains usable if browser storage is unavailable.
    }
  }, [todos])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // Theme still applies for the current session.
    }
  }, [theme])

  const filteredTodos = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    if (!term) return todos
    return todos.filter(todo =>
      String(todo.name || '').toLowerCase().includes(term) ||
      String(todo.description || '').toLowerCase().includes(term)
    )
  }, [todos, searchTerm])

  const handleAddTodo = task => setTodos(current => [...current, task])
  const handleDeleteTodo = id => {
    setTodos(current => current.filter(todo => todo.id !== id))
    if (editingTodo?.id === id) setEditingTodo(null)
  }
  const handleUpdateTodo = updated => {
    setTodos(current => current.map(todo => todo.id === updated.id ? updated : todo))
    setEditingTodo(null)
  }

  const completedCount = todos.filter(todo => todo.statut === 'Terminé').length

  return (
    <main className="container mx-auto min-h-screen px-4 py-8">
      <section className="mx-auto flex w-full max-w-3xl flex-col items-center">
        <header className="mb-3 flex w-full items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-widest opacity-60">Organisation personnelle</p>
            <h1 className="text-4xl font-bold">To-do App</h1>
          </div>
          <button className="btn btn-circle btn-ghost" type="button" onClick={() => setTheme(current => current === 'light' ? 'dark' : 'light')} aria-label="Changer le thème">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </header>
        <p className="mb-6 text-center text-base-content/70">Organisez vos tâches, suivez leur priorité et conservez-les dans ce navigateur.</p>
        <div className="mb-5 grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="stat rounded-box bg-base-200"><div className="stat-title">Total</div><div className="stat-value text-2xl">{todos.length}</div></div>
          <div className="stat rounded-box bg-base-200"><div className="stat-title">Terminées</div><div className="stat-value text-2xl">{completedCount}</div></div>
          <div className="stat col-span-2 rounded-box bg-base-200 sm:col-span-1"><div className="stat-title">À traiter</div><div className="stat-value text-2xl">{todos.length - completedCount}</div></div>
        </div>
        <div className="w-full space-y-4">
          <TodoList todos={filteredTodos} onDelete={handleDeleteTodo} onEdit={setEditingTodo} onSearch={setSearchTerm} />
          <TodoForm onAdd={handleAddTodo} editingTodo={editingTodo} onUpdate={handleUpdateTodo} onCancel={() => setEditingTodo(null)} />
        </div>
      </section>
    </main>
  )
}

export default App
