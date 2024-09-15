import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'

const App = () => {
  return (
    <div>
      <AnecdoteList/>
      <Filter/>
      <AnecdoteForm/>
    </div>
  )
}

export default App