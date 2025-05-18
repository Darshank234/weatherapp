const SearchHistory = ({ searchHistory, setLocation, getWeather, darkMode }) => (
  searchHistory.length > 0 && (
    <div style={{ marginTop: "20px" }}>
      <h3>Recent Searches:</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
        {searchHistory.map((city, index) => (
          <button
            key={index}
            onClick={() => {
              setLocation(city);
              getWeather(city);
            }}
            style={{
              padding: "5px 10px",
              backgroundColor: darkMode ? "#555" : "#e0e0e0",
              color: darkMode ? "#fff" : "#000",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  )
);
export default SearchHistory;
