import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";
import loginServies from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handlePassword = ({ target }) => {
    setPassword(target.value);
  };

  const handleUsername = ({ target }) => {
    setUsername(target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginServies.login({
        username,
        password,
      });

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log("Wrong Credentials");
    }
  };
  if (user === null) {
    return (
      <>
        <Login
          username={username}
          password={password}
          handlePassword={handlePassword}
          handleUsername={handleUsername}
          handleLogin={handleLogin}
        />
      </>
    );
  } else {
    return (
      <div>
        <h2>Blogs</h2>
        <h4>{user.name} logged in</h4>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  }
};

export default App;
