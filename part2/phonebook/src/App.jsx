import { useState } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter.jsx";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilterName(event.target.value);

  const addPerson = (event) => {
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
      <Filter filterName={filterName} handleChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        handleSubmit={addPerson}
        person={{ name: newName, number: newNumber }}
        handleChanges={{
          name: handleNameChange,
          number: handleNumberChange,
        }}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filterName={filterName} />
    </div>
  );
};

export default App;
