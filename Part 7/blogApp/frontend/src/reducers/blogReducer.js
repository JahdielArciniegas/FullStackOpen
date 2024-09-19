import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name : 'blog',
  initialState: [],
  reducers: {
    addLike(state,action){
      const id = action.payload.id
      const blogToChange = state.find(b => b.id === id)
      const changeBlog = { ...blogToChange, likes : blogToChange.likes + 1 }
      return state.map(blog => blog.id !== id ? blog : changeBlog)
    },
    addComment(state, action){
      const id = action.payload.blog
      const blogToChange = state.find(b => b.id === id)
      const changeBlog = { ...blogToChange, comments : blogToChange.comments.concat(action.payload) }
      return state.map(blog => blog.id !== id ? blog : changeBlog)
    },
    deleteB(state,action){
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    }
    ,
    appendBlog(state,action){
      state.push(action.payload)
    },
    setBlog(state, action){
      return action.payload
    },
  }
})

export const { appendBlog,setBlog,addLike,deleteB,addComment } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    const SortBlog = await blogs.sort((a,b) => b.likes - a.likes)
    dispatch(setBlog(SortBlog))
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const addNewLike = (id, content) => {
  return async dispatch => {
    const newBlog = await blogService.update(id, content)
    dispatch(addLike(newBlog))
  }
}

export const addNewComment = (content) => {
  return async dispatch => {
    const newComment = await blogService.addComment(content)
    dispatch(addComment(newComment))
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch(deleteB(id))
  }
}

export default blogSlice.reducer