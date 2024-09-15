import { createSlice } from "@reduxjs/toolkit"

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

// export const vote = (id) => {
//   return {
//     type: 'ADD_VOTE',
//     payload: {id}
//   }
// }

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

// export const newAnecdote = (content) => {
//   return {
//     type : "ADD_ANECDOTE",
//     payload : {
//       content,
//       votes : 0,
//       id : generateId()
//     }
//   }
// }
const initialState = anecdotesAtStart.map(asObject)

const anecdotes = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addAnecdote(state, action) {
      const content = action.payload
      state.push({
        content,
        votes : 0,
        id : generateId()
      })
    },
    addVote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      const changeAnecdote = {...anecdoteToChange, votes : anecdoteToChange.votes + 1}
      return state.map(anecdote => anecdote.id !== id ? anecdote : changeAnecdote)
    }
  }
})

// const anecdotes = (state = initialState, action) => {
//   switch (action.type) {
//     case 'ADD_ANECDOTE' : {
//       return [...state, action.payload]
//     }
//     case 'ADD_VOTE' :{
//       const id = action.payload.id
//       const anecdoteToChange = state.find(n => n.id === id)
//       const changeAnecdote = {...anecdoteToChange, votes : anecdoteToChange.votes + 1}
//       return state.map(anecdote => anecdote.id !== id ? anecdote : changeAnecdote)
//     }
//   }

//   return state
// }

export default anecdotes.reducer