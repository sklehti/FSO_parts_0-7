import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) =>
      setBlogs(
        blogs.sort(function (a, b) {
          return b.likes - a.likes;
        })
      )
    );
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const logout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const addBlog = async (blogObject) => {
    if (
      blogObject.title.length === 0 ||
      blogObject.author.length === 0 ||
      blogObject.url.length === 0
    ) {
      setErrorMessage("Fill in all fields");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } else {
      blogFormRef.current.toggleVisibility();
      await blogService.create(blogObject);

      setMessage(`Blog '${blogObject.title}' added`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);

      const allBlogs = await blogService.getAll();
      setBlogs(allBlogs);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      setUser(user);
      blogService.setToken(user.token);

      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <div>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">
            login
          </button>
        </form>
      </div>
    </Togglable>
  );

  const blogFormRef = useRef();

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  const toggleImportanceOf = async (id) => {
    const blog = blogs.find((b) => b.id === id);
    let l = blog.likes + 1;

    const changedBlog = { ...blog, likes: l };

    await blogService.update(id, changedBlog).catch((error) => {
      setErrorMessage(`Blog '${blog.title}' was already removed from server`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    });

    setBlogs(blogs.map((blog) => (blog.id !== id ? blog : changedBlog)));
  };

  const deleteAll = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id);

      setBlogs(blogs.filter((b) => b.id !== blog.id));
    }
  };

  return (
    <div>
      <div>
        {user === null ? (
          <div>
            <h2>blog in the application</h2>
            <Notification errorMessage={errorMessage} message={message} />
            {loginForm()}
          </div>
        ) : (
          <div>
            <h2>blogs</h2>
            <Notification message={message} errorMessage={errorMessage} />
            <p>
              {user.name} logged in
              <button id="logout-button" onClick={logout}>
                logout
              </button>
            </p>

            {blogForm()}
            {blogs
              .sort(function (a, b) {
                return b.likes - a.likes;
              })
              .map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  userName={user.username}
                  deleteAll={() => deleteAll(blog)}
                  toggleImportance={() => toggleImportanceOf(blog.id)}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
