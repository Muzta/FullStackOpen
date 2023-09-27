import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterCountry, setFilterCountry] = useState("");
  const [countriesToShow, setCountriesToShow] = useState([]);
  const [capitalWeatherData, setCapitalWeatherData] = useState();

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setCountries(response.data));
  }, []);

  // Whenever the list of countries to show changes, see if it's needed to retrieve weather data from that country alone
  useEffect(() => {
    if (countriesToShow.length !== 1) {
      setCapitalWeatherData(null);
    } else {
      const [lat, lng] = countriesToShow.find(() => true).latlng;
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${
            import.meta.env.VITE_WEATHER_API_KEY
          }&units=metric`
        )
        .then((response) => setCapitalWeatherData(response.data));
    }
  }, [countriesToShow]);

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
        capitalWeatherData={capitalWeatherData}
      />
    </div>
  );
};

export default App;
