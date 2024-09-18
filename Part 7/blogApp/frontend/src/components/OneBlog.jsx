import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addNewLike } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const OneBlog = () => {
  const id = useParams().id
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(b => b.id === id)



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
    </div>
  )
}

export default OneBlog
