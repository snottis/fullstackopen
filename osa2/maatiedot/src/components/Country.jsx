import axios from 'axios';
import { useState, useEffect } from 'react';
import Weather from './Weather';

const apikey = process.env.REACT_APP_API_KEY;
const Country = ({ country }) => {
  const [weather, setweather] = useState({});
  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${apikey}&query=${country.capital}`
      )
      .then((res) => {
        setweather(res.data.current);
      });
  }, []);
  return (
    <div>
      <h2>{country.name}</h2>
      <p>
        capital {country.capital}
        <br />
        population {country.population}
      </p>
      <h3>languages</h3>
      <ul>
        {country.languages.map((l) => {
          return <li key={l.name}>{l.name}</li>;
        })}
      </ul>
      <img src={country.flag} height="128" alt={country.name} />
      <h3>Weather in {country.capital}</h3>
      <Weather weather={weather} />
    </div>
  );
};

export default Country;
