const dummy = (blogs) => {
  return 1;
}

const totalLikes = (listBlog) => {
  const likes = listBlog.map(blog => blog.likes)
  
  let initial = 0
  const sumTotalLikes = likes.reduce((acc, cur) => acc + cur,initial)
  return sumTotalLikes
}

const favoriteBlog = (blogs) => {
  const likes = blogs.map(blog => blog.likes)

  const fav = Math.max(likes)

  return blogs.find(blog => blog.likes === fav)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}