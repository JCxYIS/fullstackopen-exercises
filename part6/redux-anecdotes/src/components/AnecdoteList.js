import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initAnedote, voteAnedote } from '../reducers/anecdoteReducer'
import { setNotif, showNotif } from '../reducers/notificationReducer'

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

    useEffect(() => {
        dispatch(initAnedote()) 
      }, [dispatch]) 

    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        dispatch(voteAnedote(anecdote))
        dispatch(setNotif("you voted for '" + anecdote.content + "'", 2))
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
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList