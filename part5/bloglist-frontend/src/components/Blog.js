import { useState } from "react"

const Blog = ({ blog, updateLikes, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    }
    
    updateLikes(blog.id, updatedBlog)
  }

  const handleRemove = () => {
    removeBlog(blog.id)
  }

  const showBlogDetails = () => {
    return (
      <div>
        <div>{blog.title} <button onClick={toggleVisibility}>hide</button></div>
        <div>{blog.url}</div>
        <div>likes: {blog.likes} <button onClick={handleLike}>like</button></div>
        <div>{blog.author}</div>
        <div><button onClick={handleRemove}>remove</button></div>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      { visible ?
        showBlogDetails() :
        <div>
          {blog.title} ➡ {blog.author}
          <button onClick={toggleVisibility}>view</button>
        </div> }
    </div>  
  )
}

export default Blog