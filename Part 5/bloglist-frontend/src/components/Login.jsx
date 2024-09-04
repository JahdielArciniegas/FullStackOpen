import React from "react";
import ShowNotification from "./ShowNotification";

const Login = ({
  username,
  password,
  handlePassword,
  handleUsername,
  handleLogin,
}) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username </label>
          <input
            type="text"
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
            placeholder="Insert you password"
            value={password}
            name="Password"
            onChange={handlePassword}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
