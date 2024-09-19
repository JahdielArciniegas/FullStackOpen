import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addNewComment, addNewLike } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'

const OneBlog = () => {
  const id = useParams().id
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(b => b.id === id)

  const handleSubmitComment = async (e) => {
    e.preventDefault()
    const comment = { content : e.target[0].value, blog : blog.id }
    e.target[0].value = ''
    dispatch(addNewComment(comment))
  }


  const addLikes = async() => {
    const changedBlog = { ...blog, likes: blog.likes + 1 }
    try {
      dispatch(addNewLike(changedBlog.id, changedBlog))
    } catch (error) {
      dispatch(setNotification('Error adding like to database',2))
    }
  }

  if(!blog){
    return
  }

  return (
    <div>
      <h2>{blog.name}</h2>
      <p>{blog.url}</p>
      <div>
        <p>{blog.likes} likes</p>
        <button onClick={addLikes}>like</button>
      </div>
      <p>added by {blog.user.name}</p>
      <h3>Comments</h3>
      <form onSubmit={handleSubmitComment}>
        <input type="text" placeholder='you comment here!!!' />
        <button type='submit'>Add Comment</button>
      </form>
      <ul>
        {blog.comments.map(c => <li key={c.id}>{c.content}</li>)}
      </ul>
    </div>
  )
}

export default OneBlog
