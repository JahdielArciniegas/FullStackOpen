import { createSlice } from "@reduxjs/toolkit"

const initialState = "Hello"

const notification = createSlice({
  name: 'notification',
  initialState,
  reducers : {
    showNotification(state,action){
      const content = action.payload
      return content
    },
    cleanNotification(state,action){
      return action.payload
    }

  }
})

export default notification.reducer