import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const Users = () => {
  const users = useSelector((state) => state.user);

  const text = {
    fontWeight: "bold",
  };

  return (
    <div>
      <h1>Users</h1>
      <Table striped>
        <tbody>
          <tr>
            <th></th>
            <th style={text}>blogs created</th>
          </tr>

          {users.map((u, index) => (
            <tr key={index}>
              <td>
                <Link to={`/users/${u.id}`}>{u.name}</Link>
              </td>
              <td>{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
