import { configureStore } from "@reduxjs/toolkit";
import anecdotes from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from "./reducers/notificationReducer";

const store = configureStore({
  reducer: {
    anecdotes,
    filter : filterReducer,
    notification : notificationReducer
  }
})

export default store