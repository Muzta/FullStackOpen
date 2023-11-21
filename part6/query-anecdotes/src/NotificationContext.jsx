/* eslint-disable indent */
import { createContext, useReducer, useContext } from "react";

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

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;

export const useNotificationValue = () => {
  const [notification, dispatch] = useContext(NotificationContext);
  return notification;
};

export const useNotificationDispatch = () => {
  const [notification, dispatch] = useContext(NotificationContext);
  return dispatch;
};
