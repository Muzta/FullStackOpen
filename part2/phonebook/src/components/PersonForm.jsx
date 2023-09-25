const PersonForm = ({ handleSubmit, person, handleChanges }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Name:{" "}
          <input value={person.name} onChange={handleChanges.name} required />
        </div>
        <div>
          Number:{" "}
          <input value={person.number} onChange={handleChanges.number} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
