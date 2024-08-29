const dummy = (blogs) => {
  return 1;
}

const totalLikes = (listBlog) => {
  const likes = listBlog.map(blog => blog.likes)
  
  let initial = 0
  const sumTotalLikes = likes.reduce((acc, cur) => acc + cur,initial)
  return sumTotalLikes
}

module.exports = {
  dummy,
  totalLikes
}