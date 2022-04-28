import styles from './App.module.css'
import { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import TaskForm from './components/TaskForm'
import {
  BsTrash,
  BsBookmarkCheck,
  BsBookmarkCheckFill
} from 'react-icons/bs'

function App() {

  const API = ' http://localhost:5000'

  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    loadData()
  }, [])

  // get task
  const loadData = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API}/todos`)
      const json = await res.json()
      setLoading(false)
      setTodos(json)
    } catch (e) {
      setLoading(false)
      setTodos([])
    }
  }

  //add task
  const addTaskHandler = async (todo) => {
    await fetch(`${API}/todos`, {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: { 'Content-type': 'application/json' }
    })
    setTodos(prevState => [...prevState, todo])
  }

  //delete task
  const handleDelete = async (id) => {
    await fetch(`${API}/todos/${id}`, {
      method: 'DELETE'
    })
    setTodos(prevState => prevState.filter(item => item.id !== id))
  }

  //edit task
  const handleEdit = async (todo) => {
    todo.done = !todo.done

    const data = await fetch(`${API}/todos/${todo.id}`, {
      method: 'PUT',
      body: JSON.stringify(todo),
      headers: { 'Content-type': 'application/json' }
    })
    // setTodos(prevState => [...prevState])
    setTodos(prevState => prevState.map(task => task.id === data.id ? task = data : task))
  }

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div className='App'>
      <Header />
      <main className={styles.main}>
        <div>
          <h2>O que você vai fazer?</h2>
          <TaskForm
            btnText='Criar tarefa'
            addTaskHandler={addTaskHandler} />
        </div>
        <div>
          <ul className={styles.list_todo}>
            <h2>Tarefas:</h2>
            {todos.length === 0 && <p>Não há tarefas!</p>}
            {todos &&
              todos.map(todo => (
                <li className={styles.todo} key={todo.id}>
                  <h3 className={todo.done ? styles.todo_done : ''}>{todo.title}</h3>
                  <p>Duração: {todo.time} horas</p>
                  <div className={styles.actions}>
                    <button onClick={() => handleEdit(todo)}>
                      {!todo.done ? <BsBookmarkCheck /> : <BsBookmarkCheckFill />}
                    </button>
                    <button>
                      <BsTrash onClick={() => handleDelete(todo.id)} />
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  )
}
export default App
