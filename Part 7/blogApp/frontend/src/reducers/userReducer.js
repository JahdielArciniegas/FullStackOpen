import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name : 'user',
  initialState : null,
  reducers : {
    logIn(state, action){
      const user = action.payload
      return user
    },
    logOut(state,action){
      return null
    }
  }
})

export const { logIn, logOut } = userSlice.actions

export default userSlice.reducer