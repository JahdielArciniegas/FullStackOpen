import { configureStore } from "@reduxjs/toolkit";
import anecdotes from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
  reducer: {
    anecdotes,
    filter : filterReducer
  }
})

export default store