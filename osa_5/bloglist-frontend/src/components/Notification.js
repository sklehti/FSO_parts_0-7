import React from "react";

const Notification = ({ errorMessage, message }) => {
  if (errorMessage === null && message === null) {
    return null;
  } else if (errorMessage !== null) {
    return <div className="error">{errorMessage}</div>;
  } else if (message !== null) {
    return <div className="note">{message}</div>;
  } else {
    return null;
  }
};

export default Notification;
