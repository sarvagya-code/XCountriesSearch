import React from 'react';
import './CountryCard.css'

export default function CountryCard({country}) {
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
  return (
    <div className='countryCard'>
      <div key={country.cca3} style={cardStyle}>
          <img
              src={country.flags.png}
              alt={country.name.common}
              style={flagStyle}
          />
          <p>{}</p>
          <span>{}</span>
          <h2>{country.name.common}</h2>
      </div>
    </div>
  )
}