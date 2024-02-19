import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification) {
    return (
      <div
        className={`${
          notification.error ? "bg-red-600" : "bg-lime-600"
        } size-fit text-white mx-4 mt-4 border-solid rounded-lg border-gray-300 p-4`}
      >
        {notification.message}
      </div>
    );
  }
};

export default Notification;
