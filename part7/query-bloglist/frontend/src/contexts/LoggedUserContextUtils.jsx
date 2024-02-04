import { useContext } from "react";
import LoggedUserContext from "./LoggedUserContext";

export const useLoggedUserValue = () => {
  const loggedUserAndDispatch = useContext(LoggedUserContext);
  return loggedUserAndDispatch[0];
};

export const useLoggedUserDispatch = () => {
  const loggedUserAndDispatch = useContext(LoggedUserContext);
  return loggedUserAndDispatch[1];
};
