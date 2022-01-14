import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { deleteBlog, likeTheBlog } from "../reducers/blogReducer";
import { Table, Form, Button } from "react-bootstrap";

const Blog = ({ blogList, userName }) => {
  const [likes, setLikes] = useState(null);

  const dispatch = useDispatch();
  const { id } = useParams();

  const blog = blogList.filter((b) => b.id === id);
  console.log(blog, "id", userName);

  const buttonStyle = {
    color: "white",
    backgroundColor: "blue",
    opacity: 0.7,
    borderRadius: "8px",
  };

  const deleteAll = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog));
    }
  };

  const handleLikesChange = () => {
    setLikes(likes + 1);

    const blog = blogList.find((b) => b.id === id);
    let l = blog.likes + 1;

    const changedBlog = { ...blog, likes: l };

    dispatch(likeTheBlog(id, changedBlog));
  };

  return (
    <div>
      {blog.length > 0 ? (
        <div>
          <h1>
            {blog[0].title} {blog[0].author}
          </h1>
          <a href={blog[0].url}>{blog[0].url}</a>
          <div />
          likes:{blog[0].likes}
          <div />
          <Button id="like-button" onClick={handleLikesChange}>
            like
          </Button>
          <div>added by {userName}</div>
          {blog[0].user.username === userName ? (
            <Button style={buttonStyle} onClick={() => deleteAll(blog[0])}>
              remove
            </Button>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Blog;
