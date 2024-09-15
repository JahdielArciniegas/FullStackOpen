import { useQuery } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import axios from 'axios'
import { getAnecdotes } from './services/anecdote'

const App = () => {

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn : getAnecdotes,
    retry : false,
    refetchOnWindowFocus: false
  })

  if(result.isLoading) {
    return <div>loading data...</div>
  }
  const anecdotes = result.data

  if(result.isError){
    return <h3>Anecdote service not available due to problems in server</h3>
  }else{
    return (
      <div>
        <h3>Anecdote app</h3>
      
        <Notification />
        <AnecdoteForm />
      
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
    )
  }
  }



  

export default App
