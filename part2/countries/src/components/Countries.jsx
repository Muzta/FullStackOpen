import Country from "./Country";

const Countries = ({ countries, filterCountry }) => {
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filterCountry.toLowerCase())
  );

  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (filteredCountries.length === 1) {
    return (
      <div>
        {/* Get the first element (only element) of the array */}
        <Country country={filteredCountries.find(() => true)} data={true} />
      </div>
    );
  } else {
    return (
      <div>
        {filteredCountries.map((country) => (
          <Country key={countries.indexOf(country)} country={country} />
        ))}
      </div>
    );
  }
};

export default Countries;
