import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/user'

const usersSlice = createSlice({
  name : 'users',
  initialState : [],
  reducers: {
    setUser(state, action){
      return action.payload
    }
  }
})

export const { setUser } = usersSlice.actions

export const initializeUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch(setUser(users))
  }
}

export default usersSlice.reducer