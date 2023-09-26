const Person = ({ person, handleRemove }) => {
  return (
    <p>
      {person.name} {person.number}{" "}
      <button onClick={() => handleRemove(person)}>Delete</button>
    </p>
  );
};

export default Person;
