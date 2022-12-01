import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Toggleable from './components/Toggleable'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
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
      setBlogs(blogs.map((blog) => (blog.id === response.id ? response : blog)))
    } catch (exception) {
      setMessage(`Error: ${exception.response.data.error}`)
      setTimeout(() => setMessage(null), 5000)
    }
  }

  const removeBlog = async (id) => {
    const toDelete = blogs.find((blog) => blog.id === id)
    const ok = window.confirm(
      `Remove blog '${toDelete.title}' by ${toDelete.author}?`
    )
    if (ok) {
      await blogService.remove(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
      setMessage(`${toDelete.title} by ${toDelete.author} deleted.`)
      setTimeout(() => setMessage(null), 5000)
    }
  }

  const blogFormRef = useRef()

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} />
        <LoginForm handleLogin={handleLogin} />
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
      <Toggleable buttonLabel="create" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Toggleable>
      <div className="blogs">
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateLikes={updateLikes}
              removeBlog={removeBlog}
            />
          ))}
      </div>
    </div>
  )
}

export default App
