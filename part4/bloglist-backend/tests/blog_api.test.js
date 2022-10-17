const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('../utils/test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (const blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('verify blogs id property', async () => {
  const response = await api.get('/api/blogs')
  const blogIds = response.body.map(blog => blog.id)

  for (const id of blogIds) {
    expect(id).toBeDefined()
  }
})

test('total blogs increase by one', async () => {
  const newBlog = {
    title: 'Jimmy John subs rock',
    author: 'Jimmy John',
    url: 'http://blog.jimmyjohns.com',
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const authors = blogsAtEnd.map(blog => blog.title)

  expect(authors).toHaveLength(helper.initialBlogs.length + 1)
  expect(authors).toContain('Jimmy John subs rock')
})

test('blog without likes is not added', async () => {
  const noLikeBlog = {
    title: 'No likes',
    author: 'Like Livingston',
    url: 'http://nolikeshere.com'
  }

  await api
    .post('/api/blogs')
    .send(noLikeBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
  expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
})

afterAll(() => {
  mongoose.connection.close()
})