const SearchBar = ({
  location,
  setLocation,
  fetchCitySuggestions,
  suggestions,
  setSuggestions,
  getWeather,
  getLocation,
  darkMode,
}) => (
  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px" }}>
    <div style={{ position: "relative" }}>
      <input
        style={{ padding: "10px", width: "200px" }}
        type="text"
        placeholder="Enter Location"
        value={location}
        onChange={(e) => {
          const value = e.target.value;
          setLocation(value);
          fetchCitySuggestions(value);
        }}
      />
      {suggestions.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            marginTop: "5px",
            padding: "0",
            backgroundColor: darkMode ? "#222" : "#fff",
            border: "1px solid #ccc",
            borderRadius: "5px",
            width: "200px",
            maxHeight: "150px",
            overflowY: "auto",
            position: "absolute",
            zIndex: "10",
          }}
        >
          {suggestions.map((city, index) => (
            <li
              key={index}
              onClick={() => {
                setLocation(city);
                setSuggestions([]);
              }}
              style={{
                padding: "8px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
                color: darkMode ? "#fff" : "#000",
              }}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
    <button onClick={() => getWeather()}>Get Weather</button>
    <button onClick={getLocation} style={{ padding: "0.5rem 1rem" }}>
      Get My Current Location
    </button>
  </div>
);
export default SearchBar;
