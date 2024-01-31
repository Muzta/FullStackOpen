import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification) {
    const notificationStyle = {
      color: notification.error ? "red" : "green",
      background: "lightgrey",
      fontSize: 20,
      borderStyle: "solid",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    };

    return (
      <div className="notification" style={notificationStyle}>
        {notification.message}
      </div>
    );
  }
};

export default Notification;
