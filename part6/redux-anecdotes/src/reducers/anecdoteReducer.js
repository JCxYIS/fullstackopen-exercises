import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'


const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

/* -------------------------------------------------------------------------- */

// redux reducer
// const reducer = (state = initialState, action = {type: '', data: undefined}) => {
//   console.log('state now: ', state)
//   console.log('action', action)
  
//   let newState = [...state]
//   switch(action.type)
//   {
//     case 'VOTE':
//       newState = newState.map(a => {
//         if(a.id === action.data)
//         {
//           return {
//             ...a,
//             votes: a.votes+1
//           }
//         }
//         return a
//       });
//       break;
//     case 'CREATE':
//       newState = [...newState, asObject(action.data)]
//       break;
//   }

//   return newState
// }


// redux toolkit slice
const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [], //initialState,
  reducers: {
    appendAnedote(state, action) {
      state.push(action.payload)
    },
    setOneAnedote(state, action) {
      const index = state.findIndex(a => a.id === action.payload.id)
      state[index] = action.payload
    },
    setAnedote(state, action) {
      console.log(action)      
      return action.payload
    }
  },
})

/* -------------------------------------------------------------------------- */

// redux actions
// export const vote = (id) => {
//   return {
//     type: 'VOTE',
//     data: id
//   }
// }

// export const createAnedote = (content) => {
//   return {
//     type: 'CREATE',
//     data: content
//   }
// }


// redux toolkit actions
export const { appendAnedote, setAnedote, setOneAnedote } = anecdoteSlice.actions

// redux-thunk modded dispatch
export const initAnedote = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnedote(anecdotes))
  }
}

export const createAnedote = (content) => {
  return async dispatch => {
    const object = asObject(content)
    await anecdoteService.createNew(object)
    dispatch(appendAnedote(object))
  }
}

export const voteAnedote = (anecdoteObject) => {
  return async dispatch => {
    const object = {...anecdoteObject}
    object.votes += 1
    await anecdoteService.put(object)
    dispatch(setOneAnedote(object))
  }
}

/* -------------------------------------------------------------------------- */

// export default reducer
export default anecdoteSlice.reducer