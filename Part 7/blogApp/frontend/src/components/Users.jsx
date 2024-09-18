import { useSelector } from 'react-redux'

const Users = () => {
  const users = useSelector(state => state.users)

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre Usuario</th>
            <th>Blog Created</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(user => <tr key={user.id}><td>{user.name}</td><td>{user.blogs.length}</td></tr>)
          }
        </tbody>
      </table>

    </div>
  )
}

export default Users
