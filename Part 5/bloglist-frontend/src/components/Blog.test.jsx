import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect } from 'vitest'

test('Title and Author visibles, but url and likes not', async() => {
  const blog = {
    title : 'Understanding JavaScript Closures',
    author : 'Jane Doe',
    url : 'https://example.com/javascript-closures',
    likes : 252,
    user : {
      name : 'Matti Luukkainen'
    }
  }

  const addLikes = () => console.log('likes')
  const deleteBlog = () => console.log('delete')

  const user = {
    name : 'Matti Luukkainen'
  }

  const { container } = render(<Blog blog={blog} user={user} addLikes={addLikes} deleteBlog={deleteBlog}/>)

  const title = screen.getByText('Understanding JavaScript Closures - Jane Doe')
  expect(title).toBeDefined()

  screen.debug(container)

  const hide = container.querySelector('.content-hide')
  expect(hide).toHaveStyle('display: none')
})

test('content hide pass view', async() => {
  const blog = {
    title : 'Understanding JavaScript Closures',
    author : 'Jane Doe',
    url : 'https://example.com/javascript-closures',
    likes : 252,
    user : {
      name : 'Matti Luukkainen'
    }
  }

  const addLikes = () => console.log('likes')
  const deleteBlog = () => console.log('delete')

  const user = {
    name : 'Matti Luukkainen'
  }

  render(<Blog blog={blog} addLikes={addLikes} deleteBlog={deleteBlog} user={user}/>)
} )