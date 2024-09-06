import React from "react";

const AddBlog = ({
  title,
  author,
  url,
  handleTitle,
  handleAuthor,
  handleUrl,
  addBlog,
  addNewBlogVisible,
  handleVisibleNewBlog,
}) => {
  const hideWhenVisible = { display: addNewBlogVisible ? "none" : "" };
  const showWhenVisible = { display: addNewBlogVisible ? "" : "none" };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={handleVisibleNewBlog}>Create new note</button>
      </div>
      <div style={showWhenVisible}>
        <h3>Create new</h3>
        <form onSubmit={addBlog}>
          <div>
            <label htmlFor="title">Title : </label>
            <input
              type="text"
              id="title"
              name="Title"
              value={title}
              onChange={handleTitle}
            />
          </div>
          <div>
            <label htmlFor="author">Author : </label>
            <input
              type="text"
              id="author"
              name="Author"
              value={author}
              onChange={handleAuthor}
            />
          </div>
          <div>
            <label htmlFor="url">Url : </label>
            <input
              type="text"
              id="url"
              name="Url"
              value={url}
              onChange={handleUrl}
            />
          </div>
          <button type="submit" onClick={handleVisibleNewBlog}>
            Create
          </button>
        </form>
        <button onClick={handleVisibleNewBlog}>Cancel</button>
      </div>
    </div>
  );
};

export default AddBlog;
