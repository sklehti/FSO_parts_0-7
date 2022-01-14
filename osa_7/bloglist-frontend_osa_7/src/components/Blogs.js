import React from "react";
import Notification from "./Notification";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Blogs = ({ blogForm, login, blogList }) => {
  const blogStyle = {
    padding: 10,
    paddingLeft: 2,
    borderStyle: "double",
    borderWidth: 1,
    marginBottom: 5,
    textAligh: "center",
  };

  return (
    <div>
      <Notification />
      {blogForm}
      <br />
      {blogList
        .sort(function (a, b) {
          return b.likes - a.likes;
        })
        .map((blog) => (
          <div key={blog.id} style={blogStyle} className="blog">
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        ))}
    </div>
  );
};

export default Blogs;
