import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";
import loginServies from "./services/login";
import AddBlog from "./components/AddBlog";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogAuthor, setNewBlogAuthor] = useState("");
  const [newBlogUrl, setNewBlogUrl] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedBlogappUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const handleTitle = ({ target }) => {
    setNewBlogTitle(target.value);
  };

  const handleAuthor = ({ target }) => {
    setNewBlogAuthor(target.value);
  };

  const handleUrl = ({ target }) => {
    setNewBlogUrl(target.value);
  };

  const handlePassword = ({ target }) => {
    setPassword(target.value);
  };

  const handleUsername = ({ target }) => {
    setUsername(target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
      likes: 0,
    };

    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setNewBlogTitle("");
      setNewBlogAuthor("");
      setNewBlogUrl("");
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginServies.login({
        username,
        password,
      });

      localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
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
        <h4>
          {user.name} logged in <button onClick={logout}>Logout</button>
        </h4>
        <AddBlog
          title={newBlogTitle}
          author={newBlogAuthor}
          url={newBlogUrl}
          handleAuthor={handleAuthor}
          handleTitle={handleTitle}
          handleUrl={handleUrl}
          addBlog={addBlog}
        />
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  }
};

export default App;
