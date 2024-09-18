import React from 'react'
import { useSelector } from 'react-redux'

const ShowNotification = () => {
  const notification = useSelector(state => state.notification)
  return (
    <div>
      {notification === '' ? '' : <div className="notification">{notification}</div>}
    </div>
  )
}


export default ShowNotification
