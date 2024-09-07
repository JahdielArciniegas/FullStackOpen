import { useState } from "react";
import Togglabe from "./Togglabe";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState("false");

  const hideWhenVisibleBlog = { display: visible ? "none" : "" };
  const showWhenVisibleBlog = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      {blog.title} - {blog.author}{" "}
      <button style={showWhenVisibleBlog} onClick={toggleVisibility}>
        view
      </button>
      <div style={hideWhenVisibleBlog}>
        <p>{blog.url}</p>
        <p>
          {blog.likes} <button>like</button>
        </p>
        <p>{blog.user.name}</p>
        <button onClick={toggleVisibility}>hide</button>
      </div>
    </div>
  );
};

export default Blog;
