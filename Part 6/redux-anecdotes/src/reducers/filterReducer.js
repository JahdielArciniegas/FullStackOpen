
export const seachFilter = (value) => {
  return {
    type: 'FILTER',
    payload : value
  }
}

const filterReducer = (state = '', action) => {
  switch(action.type) {
    case 'FILTER':
      return action.payload
    default:
      return state
  }
}

export default filterReducer