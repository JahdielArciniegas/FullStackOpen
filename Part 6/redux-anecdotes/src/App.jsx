import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import anecdoteSercive from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteSercive.getAll().then(notes => dispatch(setAnecdotes(notes)))
  }, [])


  return (
    <div>
      <AnecdoteList/>
      <Filter/>
      <AnecdoteForm/>
    </div>
  )
}

export default App