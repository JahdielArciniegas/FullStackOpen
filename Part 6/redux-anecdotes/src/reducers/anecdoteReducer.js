import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdotes = createSlice({
  name: 'anecdotes',
  initialState : [],
  reducers: {
    addAnecdote(state, action) {
      state.push(action.payload)
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

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdote = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdote))
  }
}


export default anecdotes.reducer