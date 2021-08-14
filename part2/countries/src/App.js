import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CountryList from './components/CountryList';

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');


  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data);
      });
  }, []);
  
  const handleChange = (e) => {
    setQuery(e.target.value)
    setCountries(countries.filter(country => country.name.toLowerCase().includes(e.target.value.toLowerCase())));
  }

  return (
    <div>
      <label>find countries</label>
      <input value={query} onChange={handleChange}></input>
      {countries.length > 10 ? <h3>Too many matches, specify another filter</h3> : <CountryList countries={countries} />}
    </div>
  );
}

export default App;
