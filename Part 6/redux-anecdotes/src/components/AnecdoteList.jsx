import { useDispatch, useSelector } from "react-redux"
import Notification from "./Notification"
import { addNewVote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.filter === '' ? state.anecdotes : state.anecdotes.filter(a => a.content.includes(state.filter) && a))
  const dispatch = useDispatch()

  const sortAnecdotes = [...anecdotes].sort((a,b) => b.votes - a.votes)

  const addVotes = (anecdote) => {
    dispatch(addNewVote(anecdote.id,anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 2))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      {sortAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => addVotes(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
