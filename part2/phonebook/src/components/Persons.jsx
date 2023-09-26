import Person from "./Person.jsx";

const Persons = ({ persons, filterName, handleRemove }) => {
  const filterPersons = (person) =>
    person.name.toLowerCase().includes(filterName.toLowerCase());

  return (
    <div>
      {persons.filter(filterPersons).map((person) => (
        <Person
          key={persons.indexOf(person)}
          person={person}
          handleRemove={handleRemove}
        />
      ))}
    </div>
  );
};

export default Persons;
