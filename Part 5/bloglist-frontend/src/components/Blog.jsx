import { useState } from "react";

const Blog = ({ blog, addLikes, deleteBlog, user }) => {
  const [visible, setVisible] = useState("false");

  const hideWhenVisibleBlog = { display: visible ? "none" : "" };

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
      <button onClick={toggleVisibility}>{!visible ? "Hide" : "View"}</button>
      <div style={hideWhenVisibleBlog}>
        <p>{blog.url}</p>
        <p>
          {blog.likes} <button onClick={() => addLikes(blog.id)}>Like</button>
        </p>
        <p>{blog.user.name}</p>
        {blog.user.name === user.name && (
          <button onClick={() => deleteBlog(blog.id)}>Remove</button>
        )}
      </div>
    </div>
  );
};

export default Blog;
