const Filter = ({ filterName, handleChange }) => {
  return (
    <div>
      Filter shown with <input value={filterName} onChange={handleChange} />
    </div>
  );
};

export default Filter;
