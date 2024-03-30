import { useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { ALL_BOOKS } from "../queries";

const Books = ({ show }) => {
  const { loading, data, refetch } = useQuery(ALL_BOOKS);
  const [currentOption, setCurrentOption] = useState("");
  const genresRef = useRef([]);

  // Persists all the genre in the db so they dont change whenever a new query is done
  useEffect(() => {
    if (genresRef.current.length === 0 && data) {
      const removeDuplicates = (array) => [...new Set(array)];

      const allGenres = removeDuplicates(
        data.allBooks.flatMap((book) => book.genres)
      );

      genresRef.current = [
        { value: "", label: "All genres" },
        ...allGenres.map((genre) => ({ value: genre, label: genre })),
      ];
    }
  }, [data]);

  if (!show) return null;
  if (loading) return <div>Loading...</div>;

  const books = data.allBooks;

  return (
    <div>
      <h2>books</h2>

      <Select
        required
        isSearchable={true}
        options={genresRef.current}
        onChange={(selectedOption) => {
          // Prevent refetching on the same selection
          if (selectedOption.value !== currentOption) {
            refetch({ genre: selectedOption.value });
            setCurrentOption(selectedOption.value);
          }
        }}
        defaultValue={genresRef.current[0]}
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
            {books.map((a) => (
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
