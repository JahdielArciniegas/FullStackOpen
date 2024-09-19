import React from 'react'
import PropTypes from 'prop-types'
import { Form , Button } from 'react-bootstrap'

const AddBlog = ({
  title,
  author,
  url,
  handleTitle,
  handleAuthor,
  handleUrl,
  addBlog,
}) => {
  return (
    <div>
      <h3>Create new</h3>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label htmlFor="title">Title : </Form.Label>
          <Form.Control
            type="text"
            id="title"
            name="Title"
            data-testid='title'
            value={title}
            onChange={handleTitle}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="author">Author : </Form.Label>
          <Form.Control
            type="text"
            id="author"
            name="Author"
            data-testid='author'
            value={author}
            onChange={handleAuthor}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="url">Url : </Form.Label>
          <Form.Control
            type="text"
            id="url"
            name="Url"
            data-testid='url'
            value={url}
            onChange={handleUrl}
          />
        </Form.Group>
        <Button variant='success' type="submit">Create</Button>
      </Form>
    </div>
  )
}

AddBlog.propTypes = {
  title : PropTypes.string.isRequired,
  author : PropTypes.string.isRequired,
  url : PropTypes.string.isRequired,
  handleTitle: PropTypes.func.isRequired,
  handleAuthor: PropTypes.func.isRequired,
  handleUrl: PropTypes.func.isRequired,
  addBlog : PropTypes.func.isRequired,
}

export default AddBlog
