import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

function App() {

  const [countries, setCountries] = useState([]);
  const [countryName, setCountryName] = useState('');

  

  const cardStyle ={
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "10px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    width: "200px"
  }

  const flagStyle ={
    width: "100px",
    height: "100px"
  }

  const fetchData = async() => {
    try{
      let res = await axios.get("https://restcountries.com/v3.1/all");
      let data = res.data;
      setCountries(data);
    }catch(err){
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() =>{
    fetchData();
  },[]);

  useEffect(()=>{
    let searchCountry = countries.filter((country) => country.name.common.toLowerCase().includes(countryName.toLocaleLowerCase()));
    if(countryName.length >=1){
      setCountries(searchCountry);
    } else{
      fetchData();
    }
  } ,[countryName]);



  return (
    <div className="App">
      <div style={{paddingBottom: '2rem'}}>
        <nav>
          <input value={countryName} type='text' onChange={(e)=>setCountryName(e.target.value)} placeholder='Search for Countries'/>
        </nav>
      </div>
      <div className='countryCard'>
        {countries.map((c) => (
          <div key={c.cca3} style={cardStyle}>
            <img 
            src={c.flags.png}
            alt={c.name.common}
            style={flagStyle}
            />
            <h2>{c.name.common}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
