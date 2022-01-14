import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const User = () => {
  const users = useSelector((state) => state.user);
  let { id } = useParams();

  const user = users.filter((u) => u.id === id);
  const blogs = user.map((u) => u.blogs);

  if (!user[0]) {
    return null;
  }

  return (
    <div>
      <h1>{user[0].name}</h1>
      {blogs[0].length > 0 ? (
        <div>
          <strong>added blogs</strong>

          <ul className="list-group">
            {blogs[0].map((u, index) => (
              <div key={index}>
                <li className="list-group-item">{u.title}</li>
              </div>
            ))}
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default User;
