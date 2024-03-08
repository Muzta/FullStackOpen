const Notification = ({ errorMessage }) => {
  if (errorMessage) return <div style={{ color: "red" }}>{errorMessage}</div>;
};

export default Notification;
