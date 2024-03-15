import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";
import UpdateAuthorYear from "./UpdateAuthorYear";

const Authors = ({ show, setError }) => {
  const result = useQuery(ALL_AUTHORS);

  if (!show) return null;

  if (result.loading) return <div>Loading...</div>;

  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      {authors.length !== 0 && (
        <>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>born</th>
                <th>books</th>
              </tr>
              {authors.map((a) => (
                <tr key={a.id}>
                  <td>{a.name}</td>
                  <td>{a.born}</td>
                  <td>{a.bookCount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <UpdateAuthorYear
            setError={setError}
            authorNames={authors.map((author) => author.name)}
          />
        </>
      )}
    </div>
  );
};

export default Authors;
