import React, { useState } from "react";
//import blogs from "../services/blogs";

const Blog = ({ blog, toggleImportance, deleteAll, userName, blogUser }) => {
  const [url, setUrl] = useState(null);
  const [likes, setLikes] = useState(null);
  const [user, setUser] = useState(null);

  const blogStyle = {
    padding: 10,
    paddingLeft: 2,
    borderStyle: "double",
    borderWidth: 1,
    marginBottom: 5,
  };

  const buttonStyle = {
    color: "white",
    backgroundColor: "blue",
    opacity: 0.7,
    borderRadius: "8px",
  };

  const showAll = () => {
    setUrl(blog.url);
    setLikes(blog.likes);
    setUser(blog.user.username);
  };

  const hideAll = () => {
    setUrl(null);
  };

  const handleLikesChange = () => {
    setLikes(likes + 1);

    toggleImportance();
  };

  return (
    <div style={blogStyle} className="blog">
      {url === null ? (
        <div>
          {blog.title} {blog.author}
          <button onClick={showAll}>view</button>
        </div>
      ) : (
        <div>
          {blog.title} {blog.author}
          <button onClick={hideAll}>hide</button>
          <br />
          {url}
          <br />
          likes:{likes}
          <button id="like-button" onClick={handleLikesChange}>
            like
          </button>
          <br />
          {user}
          <br />
          {blog.user.username === userName ? (
            <button style={buttonStyle} onClick={deleteAll}>
              remove
            </button>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
