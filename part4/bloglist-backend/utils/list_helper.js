const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce(
      (sum, curr) => sum + curr.likes, 0
    )
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  const maxLikes = Math.max(...blogs.map(blog => blog.likes))
  const mostLikedBlog = blogs.find(blog => blog.likes === maxLikes)

  return {
    title: mostLikedBlog.title,
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes
  }
}

const mostBlogs = (blogs) => {
  const authorBlogCount = lodash.countBy(blogs, 'author')

  const topAuthor = Object.keys(authorBlogCount).reduce((a, b) => {
    return authorBlogCount[a] > authorBlogCount[b] ? a : b
  })

  return {
    author: topAuthor,
    blogs: authorBlogCount[topAuthor]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}