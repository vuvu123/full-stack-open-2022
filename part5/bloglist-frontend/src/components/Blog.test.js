import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author', () => {
  const blog = {
    title: 'Renders title',
    author: 'Author',
    likes: 10,
    url: 'http://www.example.com'
  }

  render(<Blog blog={blog} />)

  const titleElement = screen.findByText('Renders title')
  const authorElement = screen.findByText('Author')
  const likesElement = screen.queryByText('10')
  const urlElement = screen.queryByText('http://www.example.com')

  expect(titleElement).toBeDefined()
  expect(authorElement).toBeDefined()
  expect(likesElement).toBeNull()
  expect(urlElement).toBeNull()
})