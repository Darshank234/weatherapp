import React, { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import SearchBar from "./SearchBar";
import SearchHistory from "./SearchHistory";
import WeatherCard from "./WeatherCard";
import Spinner from "./Spinner";

const WeatherApp = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem("searchHistory");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(styleTag);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const getWeather = async (customLocation) => {
    const searchLocation = customLocation || location.trim();
    if (!searchLocation) return alert("Please enter a valid location.");
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.weatherstack.com/current?access_key=2c4da28bd3385dfce03ab9b0233b1273&query=${encodeURIComponent(searchLocation)}`
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error.info);

      setWeatherData(data);
      setSearchHistory(prev => {
        const newHistory = [searchLocation, ...prev.filter(c => c !== searchLocation)].slice(0, 5);
        localStorage.setItem("searchHistory", JSON.stringify(newHistory));
        return newHistory;
      });
    } catch (error) {
      alert("Error fetching data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCitySuggestions = async (input) => {
    if (!input || input.length < 2) return setSuggestions([]);
    try {
      const res = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${input}&key=85dd1f4433e2408ebb500d46b1ee35d3&limit=5`);
      const data = await res.json();
      const unique = new Set();
      const cities = data.results
        .map(r => r.components.city || r.components.town || r.formatted)
        .filter(city => {
          if (unique.has(city)) return false;
          unique.add(city);
          return true;
        });
      setSuggestions(cities);
    } catch {
      setSuggestions([]);
    }
  };

  const reverseGeocode = async (lat, lon) => {
    try {
      const res = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=85dd1f4433e2408ebb500d46b1ee35d3`);
      const data = await res.json();
      const city = data.results[0]?.components.city || data.results[0]?.components.town || data.results[0]?.components.village;
      if (city) {
        setLocation(city);
        getWeather(city);
      } else {
        alert("Unable to retrieve city name.");
      }
    } catch {
      alert("Unable to retrieve city name.");
    }
  };

  const getLocation = () => {
    navigator.geolocation?.getCurrentPosition(
      ({ coords }) => reverseGeocode(coords.latitude, coords.longitude),
      () => alert("Unable to retrieve your location.")
    );
  };

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        backgroundColor: darkMode ? "#333" : "#fff",
        color: darkMode ? "#fff" : "#333",
        minHeight: "100vh",
      }}
    >
      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      <h1>Weather App</h1>
      <SearchBar
        location={location}
        setLocation={setLocation}
        fetchCitySuggestions={fetchCitySuggestions}
        suggestions={suggestions}
        setSuggestions={setSuggestions}
        getWeather={getWeather}
        getLocation={getLocation}
        darkMode={darkMode}
      />
      <SearchHistory
        searchHistory={searchHistory}
        setLocation={setLocation}
        getWeather={getWeather}
        darkMode={darkMode}
      />
      {loading && <Spinner />}
      {weatherData && weatherData.current && (
        <WeatherCard weatherData={weatherData} darkMode={darkMode} />
      )}
    </div>
  );
};

export default WeatherApp;
