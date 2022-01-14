import React from "react";
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification === "") {
    return null;
  } else if (notification[1] === "note") {
    return <Alert className="note">{notification[0]}</Alert>;
  } else if (notification[1] === "error") {
    return <Alert className="error">{notification[0]}</Alert>;
  } else {
    return <div></div>;
  }
};

export default Notification;
