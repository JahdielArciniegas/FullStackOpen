import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {

  const id = useParams().id
  const users = useSelector(state => state.users)
  const user = users.find(u => u.id === id)

  return (
    <div>
      <h2>{user.name}</h2>
      <h4>added blogs</h4>
      <ul>
        {user.blogs.map(b => <li key={b.id}>{b.title}</li>)}
      </ul>
    </div>
  )
}

export default User
