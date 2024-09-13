import { useDispatch } from "react-redux"
import { seachFilter } from "../reducers/filterReducer"

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const value = event.target.value
    dispatch(seachFilter(value))
  }
  const style = {
    marginBotton: 10
  } 
  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter
