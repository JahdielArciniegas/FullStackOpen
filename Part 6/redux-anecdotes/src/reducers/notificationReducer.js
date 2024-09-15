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
  }
})

export const {showNotification} = notification.actions

export const setNotification = (content, time) => {
  const sec = time * 1000
  return dispatch => {
    dispatch(showNotification(content))
    setTimeout(() => {
      dispatch(showNotification(""))
    }, sec)
  }
}

export default notification.reducer