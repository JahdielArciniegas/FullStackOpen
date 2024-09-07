import React from 'react'
import PropTypes from 'prop-types'

const ShowNotification = ({ notification, error }) => {
  return (
    <div>
      {notification !== null && (
        <div className="notification">{notification}</div>
      )}
      {error !== null && <div className="error">{error}</div>}
    </div>
  )
}

ShowNotification.propType = {
  notification : PropTypes.string.isRequired, error : PropTypes.string.isRequired
}

export default ShowNotification
