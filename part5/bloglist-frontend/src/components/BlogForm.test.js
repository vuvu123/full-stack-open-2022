import React from 'react'
import  '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('write title here')
  const authorInput = screen.getByPlaceholderText('write author here')
  const urlInput = screen.getByPlaceholderText('write url here')
  const createButton = screen.getByText('create')

  await user.type(titleInput, 'Testing a blog')
  await user.type(authorInput, 'Blogger')
  await user.type(urlInput, 'http://blog.test.com')
  await user.click(createButton)

  const mockCalls = createBlog.mock.calls[0][0]
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(mockCalls.title).toBe('Testing a blog')
  expect(mockCalls.author).toBe('Blogger')
  expect(mockCalls.url).toBe('http://blog.test.com')
})