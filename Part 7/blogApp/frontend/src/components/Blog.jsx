import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const linkStyle = {
    textDecoration : 'none'
  }

  return (
    <div style={blogStyle} className='content-view blog'>
      <Link style={linkStyle} to={`/blog/${blog.id}`}><p>{blog.title} - {blog.author}</p></Link>
    </div>
  )
}

Blog.propTypes = {
  blog : PropTypes.object.isRequired,
}

export default Blog
