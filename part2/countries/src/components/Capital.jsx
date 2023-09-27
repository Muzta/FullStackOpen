const Capital = ({ name, capitalWeatherData }) => {
  if (capitalWeatherData) {
    return (
      <>
        <p>
          <b>Weather in {name}</b>
        </p>
        <p>Temperature {capitalWeatherData.main.temp} Celsius</p>
        <img
          src={`https://openweathermap.org/img/wn/${capitalWeatherData.weather[0].icon}@2x.png`}
          alt={capitalWeatherData.weather[0].description}
        />
        <p>Wind {capitalWeatherData.wind.speed} m/s</p>
      </>
    );
  }
};

export default Capital;
