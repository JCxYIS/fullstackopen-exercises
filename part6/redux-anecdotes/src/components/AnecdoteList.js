import { useSelector, useDispatch } from 'react-redux'
import { vote as voteFor } from '../reducers/anecdoteReducer'
import { showNotif } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector(
        (state) => {
            console.log(state)
            return [...(state.anecdotes)]
                .filter(a => state.filter ? a.content.toLowerCase().includes(state.filter) : a)
                .sort((a, b) => b.votes - a.votes)
        }
    )
    const dispatch = useDispatch()

    const vote = (id, content) => {
        console.log('vote', id)
        dispatch(voteFor(id))
        dispatch(showNotif("you voted for '" + content + "'"))
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList