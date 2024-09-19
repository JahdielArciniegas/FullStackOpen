import React, { useState, forwardRef, useImperativeHandle } from 'react'
import Button from 'react-bootstrap/esm/Button'
import PropTypes from 'prop-types'

const Togglabe = forwardRef(({ children, buttonLabel }, refs) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant='primary' onClick={toggleVisibility}>{buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button variant='danger' onClick={toggleVisibility}>Cancel</Button>
      </div>
    </div>
  )
})

Togglabe.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglabe.displayName = 'Togglable'

export default Togglabe
