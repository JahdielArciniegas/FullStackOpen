import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdotes = createSlice({
  name: 'anecdotes',
  initialState : [],
  reducers: {
    addVote(state, action) {
      const id = action.payload.id
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

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdotes(newAnecdote))
  }
}

export const addNewVote = (id, content) => {
  return async dispatch => {
    const newUpdateAnecdote = await anecdoteService.updateVotes(id, content)
    dispatch(addVote(newUpdateAnecdote))
  }
}


export default anecdotes.reducer