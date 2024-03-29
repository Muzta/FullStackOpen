import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../queries";

const RecommendedBooks = ({ show }) => {
  const { loading: bookLoading, data: booksData } = useQuery(ALL_BOOKS);
  const { loading: meLoading, data: meData } = useQuery(ME);

  if (!show) return null;
  if (bookLoading || meLoading) return <div>Loading...</div>;

  const books = booksData.allBooks.filter((book) =>
    book.genres.includes(meData.me.favoriteGenre)
  );

  return (
    <div>
      <h2>Recommendations</h2>

      <p>
        Books in your favorite genre <b>{meData.me.favoriteGenre}</b>
      </p>

      {books.length !== 0 && (
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {books.map((book) => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RecommendedBooks;
