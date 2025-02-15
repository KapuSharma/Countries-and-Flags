import './App.css';
import Countries from './components/Countries';
import { useEffect, useState } from 'react';

function App() {
  const [countryData, setCountryData] = useState([]);
  const [allCountries, setAllCountries] = useState([]); // To store the original data
  const [debounceTimeout, setDebounceTimeout] = useState();

  useEffect(() => {
    const getCountriesFlag = async () => {
      try {
        const res = await fetch(
          "https://xcountries-backend.azurewebsites.net/all"
        );
        const data = await res.json(); 
        setCountryData(data);
        setAllCountries(data); // Store the full data for reset 
      } catch (error) {
        console.error("Error fetching data:", error); // Log error to console
      }
    };
    getCountriesFlag();
  }, []);

  const performSearch = (query) => {
    if (!query) {
      setCountryData(allCountries); // Reset to original data when query is empty
      return;
    }
    const filtered = allCountries.filter((country) => {
      const nameMatch = country.name.toLowerCase().includes(query.toLowerCase());
      return nameMatch;
    });
    const sortedFiltered = filtered.sort((a, b) => a.name.localeCompare(b.name));

    setCountryData(sortedFiltered);
  };

  const debounceSearch = (event, debounceTimeout) => {
    clearTimeout(debounceTimeout);
    const newTimeout = setTimeout(() => {
      performSearch(event.target.value);
    }, 500);
    return newTimeout;
  };

  const handleInputChange = (e) => {
    const timeout = debounceSearch(e, debounceTimeout);
    setDebounceTimeout(timeout);
  };

  return (
    <div>
      <div className='input-box'>
        <input
          type="text"
          placeholder="Search for countries..."
          onChange={handleInputChange}
          className="input"
        />
      </div>
      <div className="App">
        {countryData.map((country) => {
          return <Countries name={country.name} key={country.abbr} flag={country.flag} />;
        })}
      </div>
    </div>
  );
}

export default App;