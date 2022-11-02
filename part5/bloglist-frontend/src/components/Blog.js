import { useState } from "react"

const Blog = ({ blog }) => {
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
    console.log('Like button clicked')
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
          {blog.title} - {blog.author}
          <button onClick={toggleVisibility}>view</button>
        </div> }
    </div>  
  )
}

export default Blog