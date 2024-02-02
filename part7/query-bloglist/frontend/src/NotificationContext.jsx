/* eslint-disable indent */
import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "CREATE":
      return action.payload;
    case "CLEAR":
      return "";
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );

  const createNotification = ({ message, error = false }) => {
    notificationDispatch({ type: "CREATE", payload: { message, error } });
    setTimeout(() => {
      notificationDispatch({ type: "CLEAR" });
    }, 5000);
  };

  return (
    <NotificationContext.Provider value={[notification, createNotification]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useCreateNotification = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};
