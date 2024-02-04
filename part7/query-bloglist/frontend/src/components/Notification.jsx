import { useNotificationValue } from "../contexts/NotificationContext.jsx";

const Notification = () => {
  const notification = useNotificationValue();

  if (!notification.message) return null;

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
};

export default Notification;
