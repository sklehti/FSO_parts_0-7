import React, { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import userService from "./services/users";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import Blogs from "./components/Blogs";
import Users from "./components/Users";
import User from "./components/User";
import Blog from "./components/Blog";

import { notificationChange } from "./reducers/notificationReducer";
import { initializeBlogs, createBlog } from "./reducers/blogReducer";
import { initializeUsers } from "./reducers/userReducer";
import { userLogout, userLogin } from "./reducers/loginReducer";
import { Form, Button } from "react-bootstrap";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const blogList = useSelector((state) => state.blog);
  const login = useSelector((state) => state.login);

  useEffect(() => {
    userService.getUsers().then((u) => {
      dispatch(initializeUsers(u));
    });
  }, [dispatch]);

  useEffect(() => {
    blogService.getAll().then((b) =>
      dispatch(
        initializeBlogs(
          b.sort(function (a, b) {
            return b.likes - a.likes;
          })
        )
      )
    );
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);

      blogService.setToken(user.token);

      if (user && password !== "") {
        dispatch(userLogin(username, password));
      }
    }
  }, [dispatch, username, password]);

  const logout = () => {
    window.localStorage.clear();
    dispatch(userLogout());
  };

  const addBlog = async (blogObject) => {
    if (
      blogObject.title.length === 0 ||
      blogObject.author.length === 0 ||
      blogObject.url.length === 0
    ) {
      dispatch(notificationChange("Fill in all fields", "error"));
    } else {
      blogFormRef.current.toggleVisibility();
      blogService.setToken(login.token);

      const newBlog = await blogService.create(blogObject);
      dispatch(createBlog(newBlog));

      dispatch(notificationChange(`Blog '${blogObject.title}' added`, "note"));

      const allBlogs = await blogService.getAll();
      dispatch(initializeBlogs(allBlogs));
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    dispatch(userLogin(username, password));

    setUsername("");
    setPassword("");
  };

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <div>
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label> username: </Form.Label>
            <Form.Control
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />

            <Form.Label>password:</Form.Label>
            <Form.Control
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
            <br />
            <Button id="login-button" type="submit">
              login
            </Button>
          </Form.Group>
        </Form>
      </div>
    </Togglable>
  );

  const blogFormRef = useRef();

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  const padding = {
    padding: 5,
  };

  return (
    <Router>
      <div className="container">
        <h2>blogs</h2>
        <div>
          {login === null ? (
            <div>
              <h2>blog in the application</h2>
              <Notification />
              {loginForm()}
            </div>
          ) : (
            <div>
              <p>
                <Link style={padding} to="/">
                  blogs
                </Link>
                <Link style={padding} to="/users/">
                  users
                </Link>
                {login.name} logged in{" "}
                <Button id="logout-button" onClick={logout}>
                  logout
                </Button>
              </p>

              <Routes>
                <Route path="/users/" element={<Users />} />
                <Route
                  path="/"
                  element={
                    <Blogs
                      blogForm={blogForm()}
                      login={login.username}
                      blogList={blogList}
                    />
                  }
                />
                <Route path="/users/:id" element={<User />} />
                <Route
                  path="/blogs/:id"
                  element={
                    <Blog blogList={blogList} userName={login.username} />
                  }
                />
              </Routes>
            </div>
          )}
        </div>
      </div>
    </Router>
  );
};

export default App;
