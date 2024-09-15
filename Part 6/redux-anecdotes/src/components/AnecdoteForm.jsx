import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const addNewAnecdotes = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
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