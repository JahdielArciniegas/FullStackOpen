import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const addNewAnecdotes = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch({type : 'anecdotes/addAnecdotes', payload : content})
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