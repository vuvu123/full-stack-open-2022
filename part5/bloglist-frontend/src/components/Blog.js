import { useState } from "react"

const Blog = ({ blog, updateLikes }) => {
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

  const addLike = () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    }
    
    console.log('Updated Blog before put', updatedBlog)
    updateLikes(blog.id, updatedBlog)
  }

  const showBlogDetails = () => {
    return (
      <div>
        <div>{blog.title} <button onClick={toggleVisibility}>hide</button></div>
        <div>{blog.url}</div>
        <div>likes: {blog.likes} <button onClick={addLike}>like</button></div>
        <div>{blog.author}</div>
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