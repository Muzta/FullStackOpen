import { useRef, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import Login from "./components/Login";
import NewBook from "./components/NewBook";
import Notification from "./components/Notification";
import { useApolloClient } from "@apollo/client";
import RecommendedBooks from "./components/RecommendedBooks";

const App = () => {
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);
  const genresRef = useRef();
  const client = useApolloClient();

  const createErrorMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(null), 5000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <Notification errorMessage={errorMessage}></Notification>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommended")}>recommended</button>
            <button onClick={() => logout()}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors
        show={page === "authors"}
        setError={createErrorMessage}
        token={token}
      />

      <Books show={page === "books"} ref={genresRef} />
      {token ? (
        <>
          <NewBook
            show={page === "add"}
            setError={createErrorMessage}
            genresRef={genresRef}
          />
          <RecommendedBooks show={page === "recommended"} />
        </>
      ) : (
        <Login
          show={page === "login"}
          setError={createErrorMessage}
          setToken={setToken}
        />
      )}
    </div>
  );
};

export default App;
