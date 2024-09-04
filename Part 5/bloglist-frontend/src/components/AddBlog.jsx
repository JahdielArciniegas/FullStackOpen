import React from "react";

const AddBlog = ({
  title,
  author,
  url,
  handleTitle,
  handleAuthor,
  handleUrl,
  addBlog,
}) => {
  return (
    <div>
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
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AddBlog;
