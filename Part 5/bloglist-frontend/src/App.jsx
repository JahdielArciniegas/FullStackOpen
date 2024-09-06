import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";
import loginServies from "./services/login";
import AddBlog from "./components/AddBlog";
import ShowNotification from "./components/ShowNotification";
import Togglabe from "./components/Togglabe";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogAuthor, setNewBlogAuthor] = useState("");
  const [newBlogUrl, setNewBlogUrl] = useState("");
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(null);
  const [addNewBlogVisible, setAddNewBlogVisible] = useState(false);

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
    setNotification("Loggout User");
    setTimeout(() => {
      setNotification(null);
    }, 5000);
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

    try {
      const blog = blogService.create({
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogUrl,
        likes: 0,
      });

      setBlogs(blogs.concat(blog));
      setNotification("Added Blog");
      setNewBlogTitle("");
      setNewBlogAuthor("");
      setNewBlogUrl("");
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      setError(error);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
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
      setNotification(`Log in correct`);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      setError(error);
      setTimeout(() => {
        setError(null);
      });
    }
  };
  if (user === null) {
    return (
      <>
        <h3>Log in to application</h3>
        <ShowNotification notification={notification} error={error} />
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
        <ShowNotification notification={notification} error={error} />
        <h4>
          {user.name} logged in <button onClick={logout}>Logout</button>
        </h4>
        <Togglabe buttonLabel="Create new Blog">
          <AddBlog
            title={newBlogTitle}
            author={newBlogAuthor}
            url={newBlogUrl}
            handleAuthor={handleAuthor}
            handleTitle={handleTitle}
            handleUrl={handleUrl}
            addBlog={addBlog}
            error={error}
            notification={notification}
          />
        </Togglabe>

        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  }
};

export default App;
