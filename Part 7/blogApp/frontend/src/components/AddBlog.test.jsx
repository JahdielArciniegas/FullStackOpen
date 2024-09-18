import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddBlog from './AddBlog'
import { expect } from 'vitest'

test('calls event handler with correct details when a new blog is created',async() => {
  const handleTitle = vi.fn()
  const handleAuthor = vi.fn()
  const handleUrl = vi.fn()
  const addBlog = vi.fn()
  const user = userEvent.setup()

  render(<AddBlog title='' author='' url='' handleAuthor={handleAuthor} handleTitle={handleTitle} handleUrl={handleUrl} addBlog={addBlog}/>)

  const inputs = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('Create')

  await user.type(inputs[0],'Hola')
  await user.type(inputs[1],'marco')
  await user.type(inputs[2],'.com')
  await user.click(sendButton)
  expect(addBlog.mock.calls).toHaveLength(1)
})