import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import CountryCard from './CountryCard';
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([]);
  const [countryName, setCountryName] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([]);


  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
  }

  const getCountries = async() => {
    try{
      let res = await axios.get("https://restcountries.com/v3.1/all");
      setCountries(res.data);
    }catch(e){
      console.error("Cannot fetch countries")
    }
  }

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    if (countryName.trim() === '') {
      setFilteredCountries(countries);
    } else {
      const filtered = countries.filter((country) =>
        country.name.common.toLowerCase().includes(countryName.toLowerCase())
      );
      setFilteredCountries(filtered);
    }
  }, [countryName, countries]);

  console.log(countryName)
  return (
    <div className="App">
      <div>
        <nav>
          <input value={countryName} type='text' onChange={e => setCountryName(e.target.value)}/>
        </nav>
      </div>
      <div style={containerStyle}>
        {filteredCountries.map((country) => (
          <CountryCard country={country} />
        ))}
    </div>
    </div>
  );
}

export default App;