const Filter = ({ filterCountry, handleChange }) => {
  return (
    <div>
      Find countries <input value={filterCountry} onChange={handleChange} />
    </div>
  );
};

export default Filter;
