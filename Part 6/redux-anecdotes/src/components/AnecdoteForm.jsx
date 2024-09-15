import { useDispatch } from 'react-redux'
import anecdoteService from '../services/anecdotes'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const addNewAnecdotes = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(addAnecdote(newAnecdote))
    dispatch({type : 'notification/showNotification', payload: `you created '${content}'`})
    setTimeout(() => {
      dispatch({type : 'notification/cleanNotification', payload : ""})
    }, 2000 )
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNewAnecdotes}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm