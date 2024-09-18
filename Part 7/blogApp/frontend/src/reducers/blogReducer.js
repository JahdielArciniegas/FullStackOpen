import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name : 'blog',
  initialState: [],
  reducers: {
    appendBlog(state,action){
      state.push(action.payload)
    },
    setBlog(state, action){
      return action.payload
    },
  }
})

export const { appendBlog,setBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blog = await blogService.getAll()
    dispatch(setBlog(blog))
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export default blogSlice.reducer