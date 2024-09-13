import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote} from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()
  const [sortAnecdotes, setSortAnecdotes] = useState([])

  useEffect(() => {
    setSortAnecdotes(anecdotes.sort((a,b) => b.votes - a.votes))
  },[anecdotes])
  
  const addVotes = (id) => {
    dispatch(vote(id))
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
      <AnecdoteForm/>
    </div>
  )
}

export default App