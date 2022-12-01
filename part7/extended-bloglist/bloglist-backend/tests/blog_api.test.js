const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../utils/config')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('../utils/test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some blogs saved', () => {
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
    const blogIds = response.body.map((blog) => blog.id)

    for (const id of blogIds) {
      expect(id).toBeDefined()
    }
  })
})

describe('adding blogs', () => {
  beforeAll(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('123', 10)
    const user = await new User({ username: 'name', passwordHash }).save()

    const userForToken = { username: 'name', id: user.id }
    const token = jwt.sign(userForToken, config.SECRET)

    return token
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
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const authors = blogsAtEnd.map((blog) => blog.title)

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

  test('post blogs with no title or url properties', async () => {
    const missingBlog = {
      author: 'Kenny Vu'
    }

    await api.post('/api/blogs').send(missingBlog).expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deleting blogs', () => {
  test('return status 204 for deleting blogs', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map((blog) => blog.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('updating blogs', () => {
  test('return status 200 for updated blogs', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].likes).toBe(updatedBlog.likes)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
