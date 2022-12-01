const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user
  const token = request.token
  console.log('User', user)

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!(token && decodedToken.id)) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const token = request.token
  const user = request.user
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!(user && decodedToken)) {
    return response.status(401).json({ error: 'missing or invalid token' })
  }

  const blog = await Blog.findById(request.params.id)
  if (!blog) return response.status(401).json({ error: 'blog not found' })
  console.log('Blog', blog)

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'Unauthorized' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const savedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true }
  )
  response.json(savedBlog)
})

module.exports = blogsRouter
