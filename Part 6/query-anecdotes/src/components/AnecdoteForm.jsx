import { useMutation,useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../services/anecdote"
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn : createAnecdote,
    onSuccess:(newAnecdote) => {
    const anecdotes = queryClient.getQueryData(['anecdotes'])
    queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
  }, 
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    if(content.length < 5){
      dispatch({type : 'ERROR'})
      setTimeout(() => {
        dispatch({type : 'CLEAR'})
      }, 2000)
      return
    }
    newAnecdoteMutation.mutate({content, votes : 0})
    dispatch({type : 'CREATE', payload : content})
    setTimeout(() => {
      dispatch({type : 'CLEAR'})
    }, 2000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
