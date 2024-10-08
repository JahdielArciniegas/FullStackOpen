const { test,beforeEach, after, describe } = require('node:test')
const mongoose = require('mongoose')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')
const { get } = require('node:http')

const api = supertest(app)

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  ]

beforeEach(async() => {
  await Blog.deleteMany({})

  for(let blog of initialBlogs){
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('Return list leght correct', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('Validate field id and not _id', async() => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(Object.keys(response.body[0]).includes('id'), true)
})

test('Create a blog successful', async() => {
  const newBlog = {
      title : "The Bitcoin was hacked",
      author : "Liam Hellmann",
      url : "Youtube.com",
      likes : 102
    }
  
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(b => b.title)

  assert.strictEqual(response.body.length, initialBlogs.length + 1)
  assert(titles.includes('The Bitcoin was hacked'))

})

test('Delete a blog successful', async() => {
  const response = await api.get('/api/blogs')
  const startList = response.body
  const deleteBlog = startList[0]
  await api
  .delete(`/api/blogs/${deleteBlog.id}`)
  .expect(204)
  const response2 = await api.get('/api/blogs')
  const endList = response2.body

  const titles = endList.map(r => r.title)
  assert(!titles.includes(deleteBlog.title))
})

test('Update a blog successful', async() => {
  const response = await api.get('/api/blogs')
  const startList = response.body
  const updatedBlog = startList[1]
  updatedBlog.likes = 41
  await api.put(`/api/blogs/${updatedBlog.id}`)

  const response2 = await api.get('/api/blogs')
  const endList = response2.body

  assert.notStrictEqual(startList[1].likes,endList[1].likes)
})

after(async () => {
  await mongoose.connection.close()
})

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

test('The blog with the most votes', () => {
  const blog = [
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    }
  ]

  const result = listHelper.favoriteBlog(blog)
  assert.deepStrictEqual(result, {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    likes: 12
  })
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  const listEmpty = []

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test("of empty list is zero", () => {
    const result = listHelper.totalLikes(listEmpty)
    assert.strictEqual(result, 0)
  })

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(initialBlogs)
    assert.strictEqual(result, 36)
  })
})