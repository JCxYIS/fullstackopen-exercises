import { useDispatch } from 'react-redux'
import { createAnedote } from '../reducers/anecdoteReducer'
import { showNotif } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnedote = (event) => {
        event.preventDefault()
        const input = event.target.name
        dispatch(createAnedote(input.value))
        dispatch(showNotif("you created '" + input.value + "'"))
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