import { useState, useEffect } from "react";
import phonebookService from "./services/phonebook";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter.jsx";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [notification, setNotification] = useState({});

  // Retrieve data from the JSON database, only the first time the page renders
  useEffect(() => {
    phonebookService.getAll().then((response) => setPersons(response));
  }, []);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilterName(event.target.value);

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      updatePersonNumber(existingPerson);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      phonebookService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        setNotification({
          message: `${newPerson.name} was added`,
          error: false,
        });
        setTimeout(() => {
          setNotification({});
        }, 5000);
      });
    }
  };

  const removePerson = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      phonebookService
        .remove(person.id)
        .then(() => setPersons(persons.filter((p) => p.id !== person.id)))
        .catch(() => {
          setNotification({
            message: `Information of ${person.name} has already been removed from the server`,
            error: true,
          });
          setTimeout(() => {
            setNotification({});
          }, 5000);
        });
    }
  };

  const updatePersonNumber = (person) => {
    if (
      window.confirm(
        `${person.name} is already in the phonebook, replace the old number with this new one?`
      )
    ) {
      const newPerson = { ...person, number: newNumber };
      phonebookService
        .update(person.id, newPerson)
        .then((returnedPerson) => {
          setPersons(
            persons.map((p) => (p.name !== person.name ? p : returnedPerson))
          );
          setNewName("");
          setNewNumber("");
          setNotification({
            message: `${person.name}'s number was changed`,
            error: false,
          });
          setTimeout(() => {
            setNotification({});
          }, 5000);
        })
        .catch(() => {
          setNotification({
            message: `Information of ${person.name} has already been removed from the server`,
            error: true,
          });
          setTimeout(() => {
            setNotification({});
          }, 5000);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
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
