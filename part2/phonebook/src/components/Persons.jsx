import Person from "./Person.jsx";

const Persons = ({ persons, filterName }) => {
  const filterPersons = (person) =>
    person.name.toLowerCase().includes(filterName.toLowerCase());

  return (
    <div>
      {persons.filter(filterPersons).map((person) => (
        <Person key={persons.indexOf(person)} person={person} />
      ))}
    </div>
  );
};

export default Persons;
