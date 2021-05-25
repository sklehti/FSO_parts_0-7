import React, { useState, useEffect } from "react";
import axios from "axios";

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name} </h2>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h3>languages</h3>
      <ul>
        {country.languages.map((c) => (
          <li key={c.name}>{c.name}</li>
        ))}
      </ul>
      <img
        src={country.flag}
        alt={`${country.name} flag`}
        width="300"
        height="227"
      />
    </div>
  );
};

const Countries = ({ handleCountries, countries }) => {
  return (
    <div>
      {countries.name}
      <button value={countries.name} onClick={handleCountries}>
        show
      </button>
    </div>
  );
};

const App = () => {
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(
        response.data.filter((c) =>
          c.name.toLowerCase().includes(country.toLowerCase())
        )
      );
    });
    //console.log(countries);
  }, [country]);

  const handleCountries = (event) => {
    setCountry(event.target.value);
  };

  return (
    <div>
      <div>
        find countries
        <input value={country} onChange={handleCountries} />
      </div>
      {countries.length > 10
        ? "Too many matches, specify another filter"
        : countries.map((c) =>
            countries.length === 1 ? (
              <Country key={c.name} country={c} />
            ) : (
              <Countries
                key={c.name}
                countries={c}
                handleCountries={handleCountries}
              />
            )
          )}
    </div>
  );
};

export default App;
