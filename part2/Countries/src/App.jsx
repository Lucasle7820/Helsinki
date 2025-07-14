import { useState, useEffect } from 'react';
import countryService from './services/Fetch';
import { fetchWeather } from "./services/weather";

const Query = ({ query, setQuery }) => (
  <div>
    Find countries: 
    <input value={query} onChange={(e) => setQuery(e.target.value)} />
  </div>
);

const Show = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area}</div>
      <div>
        <h2>Languages:</h2>
        <ul>
          {Object.values(country.languages).map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
      </div>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
    </div>
  );
};

const ShowList = ({ filteredResults, onSelect }) => {
  if (filteredResults.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (filteredResults.length > 1) {
    return (
      <div>
        {filteredResults.map((country) => (
          <div key={country.name.common}>
            {country.name.common} 
            <button onClick={() => onSelect(country)}>Show</button>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const WeatherDisplay = ({ capital, weather }) => {
  const iconCode = weather.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div>
      <h1>Weather in {capital}</h1>
      <p><strong>Temperature:</strong> {weather.main.temp} °C</p>
      <img src={iconUrl} alt={weather.weather[0].description} />
      <p><strong>Wind:</strong> {weather.wind.speed} m/s</p>
    </div>
  );
}


function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);


  const [weather, setWeather] = useState(null);       // for weather data
  const [error, setError] = useState(null);           // for error handling
  const [loading, setLoading] = useState(true);       // loading state

  useEffect(() => {
    countryService.getAll().then(setData).catch(console.error);
  }, []);

  const filteredResults = data.filter((country) =>
    country.name.common.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (filteredResults.length === 1) {
      setSelectedCountry(filteredResults[0]);
    }
  }, [filteredResults]);


  //weather
  useEffect(() => {
    if (!selectedCountry || !selectedCountry.capital) return;

    setLoading(true); // important if switching countries
    fetchWeather(selectedCountry.capital)
      .then(data => {
        setWeather(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load weather");
        setLoading(false);
      });
  }, [selectedCountry]);


  return (
    <>
      <Query query={query} setQuery={setQuery} />
      <ShowList filteredResults={filteredResults} onSelect={setSelectedCountry} />
      {selectedCountry && <Show country={selectedCountry} />}
      {error && <p>{error}</p>}
      {loading && <p>Loading weather...</p>}
      {selectedCountry && weather && (
        <WeatherDisplay capital={selectedCountry.capital} weather={weather} />
      )}
    </>
  );
}

export default App;