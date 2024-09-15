import { createSlice } from "@reduxjs/toolkit"

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

const anecdotes = createSlice({
  name: 'anecdotes',
  initialState : [],
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
    },
    appendAnecdotes(state, action){
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const {addAnecdote, addVote, appendAnecdotes, setAnecdotes} = anecdotes.actions
export default anecdotes.reducer