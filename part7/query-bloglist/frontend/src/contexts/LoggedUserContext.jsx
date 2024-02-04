/* eslint-disable indent */
import { createContext, useReducer } from "react";

const initialState = null;

const loggedUserReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.payload;
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

const LoggedUserContext = createContext();

export const LoggedUserContextProvider = (props) => {
  const [loggedUser, loggedUserDispatch] = useReducer(
    loggedUserReducer,
    initialState
  );

  return (
    <LoggedUserContext.Provider value={[loggedUser, loggedUserDispatch]}>
      {props.children}
    </LoggedUserContext.Provider>
  );
};

export default LoggedUserContext;
