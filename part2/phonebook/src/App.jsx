import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addName = (event) => {
    event.preventDefault();
    const alreadyExist = () =>
      persons.filter((p) => p.name === newName).length > 0;

    if (!alreadyExist()) {
      const newPerson = {
        name: newName,
      };
      setPersons(persons.concat(newPerson));
      setNewName("");
    } else {
      alert(`${newName} is already added to the phonebook`);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          Name:{" "}
          <input
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={persons.indexOf(person)}>{person.name}</p>
      ))}
    </div>
  );
};

export default App;
