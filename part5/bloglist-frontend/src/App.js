import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Toggleable from './components/Toggleable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password, })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('wrong username or password')
      setTimeout(() => setMessage(null), 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const response = await blogService.create(blogObject)
    const updatedBlogs = blogs.concat(response)
    setBlogs(updatedBlogs)
    setMessage(`A new blog "${response.title}" by ${response.author} added.`)
    setTimeout(() => setMessage(null), 5000)
  }

  const updateLikes = async (id, blogObject) => {
    try {
      const response = await blogService.update(id, blogObject)
      setBlogs(blogs.map(blog => (blog.id === response.id ? response : blog)))
    } catch (exception) {
      setMessage(`Error: ${exception.response.data.error}`)
      setTimeout(() => setMessage(null), 5000)
    }
  }

  const removeBlog = async (id) => {
    const toDelete = blogs.find(blog => blog.id === id)
    const ok = window.confirm(`Remove blog '${toDelete.title}' by ${toDelete.author}?`)
    if (ok) {
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
      setMessage(`${toDelete.title} by ${toDelete.author} deleted.`)
      setTimeout(() => setMessage(null), 5000)
    }
  }

  const blogFormRef = useRef()

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <Notification message={message} />
          <div>
            username
            <input
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type='text'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>

        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message} />
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <Toggleable buttonLabel='create' ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Toggleable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            updateLikes={updateLikes}
            removeBlog={removeBlog}
          />
        )}
    </div>
  )
}

export default App
