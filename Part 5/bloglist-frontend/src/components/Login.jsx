import React from 'react'
import PropTypes from 'prop-types'

const Login = ({
  username,
  password,
  handlePassword,
  handleUsername,
  handleLogin,
}) => {
  return (
    <div>
      <form className='form-login' onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username </label>
          <input
            type="text"
            data-testid='username'
            id="username"
            placeholder="Insert you username"
            value={username}
            name="Username"
            onChange={handleUsername}
          />
        </div>
        <div>
          <label htmlFor="password">Password </label>
          <input
            type="password"
            id="password"
            data-testid='password'
            placeholder="Insert you password"
            value={password}
            name="Password"
            onChange={handlePassword}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

Login.propTypes = {
  username : PropTypes.string.isRequired,
  password : PropTypes.string.isRequired,
  handlePassword: PropTypes.func.isRequired,
  handleUsername: PropTypes.func.isRequired,
  handleLogin : PropTypes.func.isRequired,
}

export default Login
