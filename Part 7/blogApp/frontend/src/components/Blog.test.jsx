import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { beforeEach, describe, expect } from 'vitest'

describe('<Blog/>', () => {
  let container

  const blog = {
    title : 'Understanding JavaScript Closures',
    author : 'Jane Doe',
    url : 'https://example.com/javascript-closures',
    likes : 252,
    user : {
      name : 'Matti Luukkainen'
    }
  }

  const mockHandler = vi.fn()
  const deleteBlog = () => console.log('delete')

  const user = {
    name : 'Matti Luukkainen'
  }


  beforeEach(() => {
    container = render(<Blog blog={blog} user={user} addLikes={mockHandler} deleteBlog={deleteBlog}/>).container
  })

  test('Title and Author visibles, but url and likes not', async() => {
    const title = screen.getByText('Understanding JavaScript Closures - Jane Doe')
    expect(title).toBeDefined()
    screen.debug(container)
    const hide = container.querySelector('.content-hide')
    expect(hide).toHaveStyle('display: none')
  })

  test('After clicking the view button, view all details', async() => {
    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)
    const div = container.querySelector('.content-hide')
    expect(div).not.toHaveStyle('display : none')
  } )

  test('calls event handler twice when like button is clicked twice', async() => {
    const user = userEvent.setup()
    const likeButton = container.querySelector('.like')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})



