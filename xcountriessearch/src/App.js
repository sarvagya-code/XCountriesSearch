import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import CountryCard from './CountryCard';
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([]);
  const [countryName, setCountryName] = useState('')

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
    let findCountry = countries.filter((country) => { return country.name.common.toLowerCase().includes(countryName.toLocaleLowerCase())});
    if(countryName && countryName.length > 0){
      setCountries(findCountry);
    }else{
      getCountries();
    }
  }, [countryName]);

  console.log(countryName)
  return (
    <div className="App">
      <div>
        <nav>
          <input value={countryName} type='text' onChange={e => setCountryName(e.target.value)}/>
        </nav>
      </div>
      <div className='countryCard' style={containerStyle}>
        {countries.map((country) => (
          <CountryCard country={country} />
        ))}
    </div>
    </div>
  );
}

export default App;