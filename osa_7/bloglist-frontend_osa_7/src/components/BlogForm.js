import React, { useState } from "react";
import PropTypes from "prop-types";
import { Table, Form, Button } from "react-bootstrap";

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

      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            id="title"
            value={newTitle}
            onChange={handleTitleChange}
          />
          <br />
          <Form.Label>author:</Form.Label>
          <Form.Control
            id="author"
            value={newAuthor}
            onChange={handleAuthorChange}
          />
          <br />
          <Form.Label>url:</Form.Label>
          <Form.Control id="url" value={newUrl} onChange={handleUrlChange} />
          <br />
          <Button id="create-button" type="submit">
            create
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
