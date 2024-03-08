import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { UPDATE_BIRTHYEAR } from "../queries";
import Select from "react-select";

const UpdateAuthorYear = ({ setError, authorNames }) => {
  const [birthyear, setBirthyear] = useState("");
  const [name, setName] = useState("");

  const [updateBirthyear, result] = useMutation(UPDATE_BIRTHYEAR);

  const authorSelectOptions = authorNames.map((name) => ({
    value: name,
    label: name,
  }));

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
        name
        <Select
          required
          isSearchable={true}
          options={authorSelectOptions}
          onChange={(selectedOption) => setName(selectedOption.value)}
        />
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
