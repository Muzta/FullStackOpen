import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterCountry, setFilterCountry] = useState("");

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setCountries(response.data));
  }, []);

  const handleFilterChange = (event) => setFilterCountry(event.target.value);

  return (
    <div>
      <h2>Countries</h2>
      <Filter filterCountry={filterCountry} handleChange={handleFilterChange} />
      <Countries countries={countries} filterCountry={filterCountry} />
    </div>
  );
};

export default App;
