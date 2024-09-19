import { useState, useEffect, useRef } from 'react'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import loginServies from './services/login'
import AddBlog from './components/AddBlog'
import ShowNotification from './components/ShowNotification'
import Togglabe from './components/Togglabe'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { addNewLike, createBlog, deleteBlog, initializeBlogs } from './reducers/blogReducer'
import { logIn, logOut } from './reducers/userReducer'
import Users from './components/Users'
import { initializeUsers } from './reducers/usersReducer'
import { BrowserRouter as Router,Routes,Route, Link } from 'react-router-dom'
import User from './components/User'
import OneBlog from './components/OneBlog'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector(state => state.user)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const blogAddRef = useRef()
  const padding = {
    paddingRight: 5,
    textDecoration: 'none',
    color: '#aaa',
  }

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  },[dispatch])

  useEffect(() => {
    const loggedUser = localStorage.getItem('loggedBlogappUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(logIn(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const logout = () => {
    localStorage.removeItem('loggedBlogappUser')
    dispatch(logOut(null))
    dispatch(setNotification('Loggout User',2))
  }

  const handleTitle = ({ target }) => {
    setNewBlogTitle(target.value)
  }

  const handleAuthor = ({ target }) => {
    setNewBlogAuthor(target.value)
  }

  const handleUrl = ({ target }) => {
    setNewBlogUrl(target.value)
  }

  const handlePassword = ({ target }) => {
    setPassword(target.value)
  }

  const handleUsername = ({ target }) => {
    setUsername(target.value)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    blogAddRef.current.toggleVisibility()
    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
      likes: 0,
    }
    try {
      dispatch(createBlog(newBlog))
      setNewBlogTitle('')
      setNewBlogAuthor('')
      setNewBlogUrl('')
      dispatch(setNotification('Added Blog',2))
    } catch (error) {
      dispatch(setNotification('Problem with adding Blog',2))
    }
  }



  const deleteBlogs = (id) => {
    const blog = blogs.find((b) => b.id === id)
    if (confirm(`Remove blog You're NOT gonna need it! by ${blog.author}`)) {
      dispatch(deleteBlog(id))
      dispatch(setNotification(`Deleted ${blog.title}`,2))
    }
  }


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginServies.login({
        username,
        password,
      })

      localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(logIn(user))
      setUsername('')
      setPassword('')
      dispatch(setNotification('Log in correct',2))
    } catch (error) {
      dispatch(setNotification('Username or password is incorrect.',2))
    }
  }
  if (user === null) {
    return (
      <div className='container'>
        <h3>Log in to application</h3>
        <ShowNotification/>
        <Login
          username={username}
          password={password}
          handlePassword={handlePassword}
          handleUsername={handleUsername}
          handleLogin={handleLogin}
        />
      </div>
    )
  } else {
    return (
      <div className='container'>
        <Router>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav>
                <Nav.Link href="#" as='span'>
                  <Link to='/' style={padding}>Blogs</Link>
                </Nav.Link>
                <Nav.Link href="#" as='span'>
                  <Link to='/users' style={padding}>Users</Link>
                </Nav.Link>
                <Nav.Link href="#" as='span'>
                  <strong>{user.name}</strong> logged in <Button variant='outline-danger' onClick={logout}>Logout</Button>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <h2>Blogs</h2>
          <ShowNotification/>
          <Routes>
            <Route path='/users' element={<Users/>}/>
            <Route path='/' element={<div><Togglabe buttonLabel="Create new Blog" ref={blogAddRef}>
              <AddBlog
                title={newBlogTitle}
                author={newBlogAuthor}
                url={newBlogUrl}
                handleAuthor={handleAuthor}
                handleTitle={handleTitle}
                handleUrl={handleUrl}
                addBlog={addBlog}
              />
            </Togglabe>
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
              />
            ))}
            </div>}/>
            <Route path='/blog/:id' element={<OneBlog/>}/>
            <Route path='/users/:id' element={<User/>}/>
          </Routes>

        </Router>
      </div>
    )
  }
}

export default App
