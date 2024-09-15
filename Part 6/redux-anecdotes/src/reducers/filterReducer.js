import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const filterReducer = createSlice({
  name: 'filter',
  initialState,
  reducers : {
    filterContent(state, action){
      const content = action.payload
      return content
    }
  }
})

export default filterReducer.reducer