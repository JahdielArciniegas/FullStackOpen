import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = () => {
  const users = useSelector(state => state.users)

  return (
    <div className='container'>
      <h2>Users</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nombre Usuario</th>
            <th>Blog Created</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(user => <tr key={user.id}><td><Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td></tr>)
          }
        </tbody>
      </Table>

    </div>
  )
}

export default Users
