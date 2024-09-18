import { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Blog = ({ blog, addLikes, deleteBlog }) => {
  const [visible, setVisible] = useState(true)
  const user = useSelector(state => state.user)
  const hideWhenVisibleBlog = { display: visible ? 'none' : '' }


  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} className='content-view blog'>
      <p>{blog.title} - {blog.author}</p>
      <button onClick={toggleVisibility} data-testid={`${blog.title}`}>{!visible ? 'Hide' : 'View'}</button>
      <div style={hideWhenVisibleBlog} className='content-hide'>
        <p>{blog.url}</p>
        <p>
          <strong>{blog.likes}</strong> <button onClick={() => addLikes(blog.id)} className='like'>Like</button>
        </p>
        <p>{blog.user.name}</p>
        {blog.user.name === user.name && (
          <button onClick={() => deleteBlog(blog.id)}>Remove</button>
        )}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog : PropTypes.object.isRequired,
  addLikes : PropTypes.func.isRequired,
  deleteBlog : PropTypes.func.isRequired,
}

export default Blog
