import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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

  const createBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      'title': title,
      'author': author,
      'url': url
    }

    const response = await blogService.create(newBlog)
    const updatedBlogs = blogs.concat(response)
    setBlogs(updatedBlogs)
    setMessage(`A new blog "${title}" by ${author} added.`)
    setTitle('')
    setAuthor('')
    setUrl('')
    setTimeout(() => setMessage(null), 5000)
  }

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
      <h2>Create new blog</h2>
      <form onSubmit={createBlog}>
        <div>
          title: <input 
          type='text' 
          value={title} 
          name='Title' 
          onChange={({ target }) => setTitle(target.value)} 
          />
        </div>
        <div>
          author: <input 
          type='text' 
          value={author} 
          name='Author' 
          onChange={({ target }) => setAuthor(target.value)} 
          />
        </div>
        <div>
          url: <input 
          type='text' 
          value={url} 
          name='Url' 
          onChange={({ target }) => setUrl(target.value)} 
          />
        </div>
        <button type='submit'>create</button>
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
        )}
      </form>
    </div>
  )
}

export default App
