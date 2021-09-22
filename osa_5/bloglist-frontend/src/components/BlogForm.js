import React, { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewtitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const handleTitleChange = (event) => {
    setNewtitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });

    setNewtitle("");
    setNewAuthor("");
    setNewUrl("");
  };

  return (
    <div className="formDiv">
      <h2>create new</h2>

      <form onSubmit={addBlog}>
        title:
        <input id="title" value={newTitle} onChange={handleTitleChange} />
        <br />
        author:
        <input id="author" value={newAuthor} onChange={handleAuthorChange} />
        <br />
        url:
        <input id="url" value={newUrl} onChange={handleUrlChange} />
        <br />
        <button id="create-button" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
