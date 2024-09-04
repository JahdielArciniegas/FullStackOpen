import React from "react";

const ShowNotification = ({ notification, error }) => {
  return (
    <div>
      {notification !== null && (
        <div className="notification">{notification}</div>
      )}
      {error !== null && <div className="error">{error}</div>}
    </div>
  );
};

export default ShowNotification;
