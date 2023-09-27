import Country from "./Country";

const Countries = ({ countries, handleShowCountry }) => {
  if (countries.length === 0 || countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (countries.length === 1) {
    return (
      <div>
        {/* Get the first element (only element) of the array */}
        <Country country={countries.find(() => true)} showData={true} />
      </div>
    );
  } else {
    return (
      <div>
        {countries.map((country, index) => (
          <Country
            key={index}
            country={country}
            handleShowCountry={handleShowCountry}
          />
        ))}
      </div>
    );
  }
};

export default Countries;
