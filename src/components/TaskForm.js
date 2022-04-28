import { useState } from 'react'
import styles from './TaskForm.module.css'

const TaskForm = ({ btnText, addTaskHandler }) => {
    const [title, setTitle] = useState('')
    const [time, setTime] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        if (title && time) {
            const todo = {
                id: Math.floor(Math.random() * 1000),
                title,
                time,
                done: false
            }
            addTaskHandler(todo)
            setTime('')
            setTitle('')
        } else {
            alert('Preencha os campos do formulário!')
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.input_container}>
                <label htmlFor="title">Título:</label>
                <input
                    type="text"
                    name='title'
                    id='title'
                    placeholder='Título da tarefa'
                    onChange={(e) => setTitle(e.target.value)}
                    value={title} />
            </div>
            <div className={styles.input_container}>
                <label htmlFor="duracao">Duração:</label>
                <input
                    type="text"
                    name='duracao'
                    id='duracao'
                    placeholder='Duração da tarefa (em horas)'
                    onChange={(e) => setTime(e.target.value)}
                    value={time} />
            </div>
            <input type="submit" value={btnText} />
        </form>
    )
}

export default TaskForm