import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

const User = () => {

  const id = useParams().id
  const users = useSelector(state => state.users)
  const user = users.find(u => u.id === id)

  if(!user){
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h4>added blogs</h4>
      <ListGroup as='ol' numbered>
        {user.blogs.map(b => <ListGroup.Item variant='secondary' as='li' key={b.id}>{b.title}</ListGroup.Item>)}
      </ListGroup>
    </div>
  )
}

export default User
