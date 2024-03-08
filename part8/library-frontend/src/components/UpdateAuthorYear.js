import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { UPDATE_BIRTHYEAR } from "../queries";

const UpdateAuthorYear = ({ setError }) => {
  const [birthyear, setBirthyear] = useState("");
  const [name, setName] = useState("");

  const [updateBirthyear, result] = useMutation(UPDATE_BIRTHYEAR);

  useEffect(() => {
    if (result.data && result.data.editAuthor === null)
      setError("Author not found");
  }, [result.data]);

  const submit = (event) => {
    event.preventDefault();
    updateBirthyear({ variables: { name, year: Number(birthyear) } });
    setBirthyear("");
    setName("");
  };

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            required
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            required
            value={birthyear}
            type="number"
            onChange={({ target }) => setBirthyear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default UpdateAuthorYear;
