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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}