const Weather = ({ weather }) => {
  if (weather === {}) {
    return <></>;
  }
  return (
    <div>
      <b>temperature: </b>
      {weather.temperature} Celsius <br />
      <img
        src={weather.weather_icons}
        alt={weather.weather_descriptions}
      />{' '}
      <br />
      <b>wind: </b> {weather.wind_speed} mph direction
    </div>
  );
};

export default Weather;
