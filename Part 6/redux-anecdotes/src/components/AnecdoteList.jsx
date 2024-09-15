import { useDispatch, useSelector } from "react-redux"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.filter === '' ? state.anecdotes : state.anecdotes.filter(a => a.content.includes(state.filter) && a))
  const dispatch = useDispatch()

  const sortAnecdotes = [...anecdotes].sort((a,b) => b.votes - a.votes)

  const addVotes = (id) => {
    dispatch({type :'anecdotes/addVote', payload: id})
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => addVotes(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
