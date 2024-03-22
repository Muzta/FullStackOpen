import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from "../queries";

const NewBook = ({ show, setError }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState(null);

  const [createBook] = useMutation(ADD_BOOK, {
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      setError(messages);
    },
    onCompleted: () => {
      setTitle("");
      setPublished("");
      setAuthor("");
      setGenres(null);
      setGenre("");
    },
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
  });

  if (!show) return null;

  const submit = async (event) => {
    event.preventDefault();
    if (!genres) setError("At least 1 genre has to be added");
    else
      createBook({
        variables: { title, author, published: Number(published), genres },
      });
  };

  const addGenre = () => {
    if (genre.trim()) {
      if (!genres) setGenres([genre]);
      else setGenres(genres.concat(genre));
    }
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            required
            value={title}
            minLength="5"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            required
            value={author}
            minLength="4"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            required
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres ? genres.join(" ") : null}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
