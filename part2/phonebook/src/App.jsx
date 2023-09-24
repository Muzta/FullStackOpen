import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  const addName = (event) => {
    event.preventDefault();
    const alreadyExist = () =>
      persons.filter((p) => p.name === newName).length > 0;

    if (!alreadyExist()) {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    } else {
      alert(`${newName} is already added to the phonebook`);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown with{" "}
        <input
          value={filterName}
          onChange={(event) => setFilterName(event.target.value)}
        />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>
          Name:{" "}
          <input
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
            required
          />
        </div>
        <div>
          Number:{" "}
          <input
            value={newNumber}
            onChange={(event) => setNewNumber(event.target.value)}
          />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filterName.toLowerCase())
        )
        .map((person) => (
          <p key={persons.indexOf(person)}>
            {person.name} {person.number}
          </p>
        ))}
    </div>
  );
};

export default App;
