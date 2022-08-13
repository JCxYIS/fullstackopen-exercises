import { useDispatch } from 'react-redux'
import { createAnedote } from '../reducers/anecdoteReducer'
import { showNotif } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdoteService'


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnedote = async (event) => {
        event.preventDefault()
        const input = event.target.name
        // const newContent = anecdoteService.createNew(input.value)
        dispatch(createAnedote(input.value))
        dispatch(showNotif("you created '" + input.value + "'", 5))
        input.value = ''
      }


    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnedote}>
                <div><input name="name" /></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm