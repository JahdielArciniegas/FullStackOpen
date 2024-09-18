import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import loginServies from './services/login'
import AddBlog from './components/AddBlog'
import ShowNotification from './components/ShowNotification'
import Togglabe from './components/Togglabe'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const blogAddRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }, [])

  useEffect(() => {
    setBlogs(blogs.sort((a, b) => b.likes - a.likes))
  },[blogs])

  useEffect(() => {
    const loggedUser = localStorage.getItem('loggedBlogappUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('loggedBlogappUser')
    setUser(null)
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
    const NewBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
      likes: 0,
    }
    try {
      const blog = await blogService.create(NewBlog)
      setBlogs(blogs.concat(blog))
      setNewBlogTitle('')
      setNewBlogAuthor('')
      setNewBlogUrl('')
      dispatch(setNotification('Added Blog',2))
    } catch (error) {
      dispatch(setNotification('Problem with adding Blog',2))
    }
  }

  const addLikes = async (id) => {
    const blog = blogs.find((b) => b.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }
    try {
      const returnedBlog = await blogService.update(id, changedBlog)
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)))
    } catch (error) {
      dispatch(setNotification('Error adding like to database',2))
    }
  }

  const deleteBlog = (id) => {
    const blog = blogs.find((b) => b.id === id)
    if (confirm(`Remove blog You're NOT gonna need it! by ${blog.author}`)) {
      blogService.deleteBlog(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
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
      setUser(user)
      setUsername('')
      setPassword('')
      dispatch(setNotification('Log in correct',2))
    } catch (error) {
      dispatch(setNotification('Username or password is incorrect.',2))
    }
  }
  if (user === null) {
    return (
      <>
        <h3>Log in to application</h3>
        <ShowNotification/>
        <Login
          username={username}
          password={password}
          handlePassword={handlePassword}
          handleUsername={handleUsername}
          handleLogin={handleLogin}
        />
      </>
    )
  } else {
    return (
      <div>
        <h2>Blogs</h2>
        <ShowNotification/>
        <h4>
          {user.name} logged in
        </h4>
        <button onClick={logout}>Logout</button>
        <Togglabe buttonLabel="Create new Blog" ref={blogAddRef}>
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
            addLikes={addLikes}
            deleteBlog={deleteBlog}
            user={user}
          />
        ))}
      </div>
    )
  }
}

export default App
