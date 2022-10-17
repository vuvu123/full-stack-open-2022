const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Web Dev Simplified',
    author: 'Kyle',
    url: 'http://blog.webdevsimplified.com',
    likes: 69,
  },
  {
    title: 'CSS Master',
    author: 'Kevin Powell',
    url: 'http://blog.kevinpowell.com',
    likes: 13,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'removeme', author: 'R', url: 'w.com', likes: 10 })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}