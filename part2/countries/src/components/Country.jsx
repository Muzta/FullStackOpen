const Country = ({ country, data = false }) => {
  // If there's only a country in the filter, retrieve all its data
  if (data) {
    return (
      <>
        <h3>{country.name.common}</h3>
        <p>Capital {country.capital[0]}</p>
        <p>Area {country.area}</p>
        <p>
          <b>Languages</b>
        </p>
        <ul>
          {/* Iterate through the languages values of the object */}
          {Object.values(country.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />
      </>
    );
  }

  return <p>{country.name.common}</p>;
};

export default Country;
