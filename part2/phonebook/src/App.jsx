import { useState, useEffect } from "react";
import phonebookService from "./services/phonebook";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter.jsx";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  // Retrieve data from the JSON database, only the first time the page renders
  useEffect(() => {
    phonebookService.getAll().then((response) => setPersons(response));
  }, []);

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

      phonebookService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
    } else {
      alert(`${newName} is already added to the phonebook`);
    }
  };

  const removePerson = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      phonebookService
        .remove(person.id)
        .then(() => setPersons(persons.filter((p) => p.id !== person.id)));
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
      <Persons
        persons={persons}
        filterName={filterName}
        handleRemove={removePerson}
      />
    </div>
  );
};

export default App;
