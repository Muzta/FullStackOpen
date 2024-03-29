import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import Select from "react-select";
import { useState } from "react";

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState("");
  const { loading, data } = useQuery(ALL_BOOKS);

  if (!props.show) return null;
  if (loading) return <div>Loading...</div>;

  const books = data.allBooks;

  const removeDuplicates = (array) => [...new Set(array)];

  const booksToShow = selectedGenre
    ? books.filter((book) => book.genres.includes(selectedGenre))
    : books;

  const allGenres = removeDuplicates(books.flatMap((book) => book.genres));

  const genreSelectOptions = [
    { value: "", label: "All genres" },
    ...allGenres.map((genre) => ({ value: genre, label: genre })),
  ];

  return (
    <div>
      <h2>books</h2>

      <Select
        required
        isSearchable={true}
        options={genreSelectOptions}
        onChange={(selectedOption) => setSelectedGenre(selectedOption.value)}
        defaultValue={genreSelectOptions[0]}
      />

      {books.length !== 0 && (
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>genres</th>
              <th>published</th>
            </tr>
            {booksToShow.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.genres.join(", ")}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Books;
