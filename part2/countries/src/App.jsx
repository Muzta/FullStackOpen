import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterCountry, setFilterCountry] = useState("");
  const [countriesToShow, setCountriesToShow] = useState([]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setCountries(response.data));
  }, []);

  const handleFilterChange = (event) => {
    const filter = event.target.value;
    setFilterCountry(filter);
    setCountriesToShow(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      )
    );
  };

  const handleShowCountry = (country) => {
    setCountriesToShow([country]);
  };

  return (
    <div>
      <h2>Countries</h2>
      <Filter filterCountry={filterCountry} handleChange={handleFilterChange} />
      <Countries
        countries={countriesToShow}
        handleShowCountry={handleShowCountry}
      />
    </div>
  );
};

export default App;
