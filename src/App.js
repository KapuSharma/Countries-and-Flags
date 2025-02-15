import './App.css';
import Countries from './components/Countries';
import { useEffect, useState } from 'react';

function App() {
  const [countryData, setCountryData] = useState([]);
  const [allCountries, setAllCountries] = useState([]); // To store the original data
  const [debounceTimeout, setDebounceTimeout] = useState();

  const getCountriesFlag = async () => {
    try {
      const res = await fetch(
        "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
      );
      const data = await res.json();
      setCountryData(data);
      setAllCountries(data); // Store the full data for reset
    } catch (error) {
      console.error("Error fetching data:", error); // Log error to console
    }
  };

  useEffect(() => {
    getCountriesFlag();
  }, []);

  const performSearch = (query) => {
    if (!query) {
      setCountryData(allCountries); // Reset to original data when query is empty
      return;
    }
    const filtered = allCountries.filter((country) => {
      const nameMatch = country.common.toLowerCase().includes(query.toLowerCase());
      return nameMatch;
    });
    const sortedFiltered = filtered.sort((a, b) => a.common.localeCompare(b.common));

    setCountryData(sortedFiltered);
  };

  const debounceSearch = (event, debounceTimeout) => {
    clearTimeout(debounceTimeout);
    const newTimeout = setTimeout(() => {
      performSearch(event.target.value);
    }, 5000);
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
        {countryData.map((Data) => {
          return <Countries Data={Data} key={Data.png} />;
        })}
      </div>
    </div>
  );
}

export default App;