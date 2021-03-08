import { useState, useEffect } from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import Content from './components/Content';
let allCountries = [];
function App() {
  const [filter, setfilter] = useState('');
  const handleFilter = (event) => {
    setfilter(event.target.value);
  };
  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((res) => {
      allCountries = [...res.data];
      setfilter('');
    });
  }, []);
  return (
    <div className="App">
      <Filter filt={filter} change={handleFilter} />
      <Content countries={allCountries} filter={filter} show={handleFilter} />
    </div>
  );
}

export default App;
