const ThemeToggle = ({ darkMode, setDarkMode }) => (
  <button
    onClick={() => setDarkMode(!darkMode)}
    style={{
      padding: "0.5rem 1rem",
      backgroundColor: darkMode ? "#333" : "#fff",
      color: darkMode ? "#fff" : "#333",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginBottom: "1rem",
    }}
  >
    {darkMode ? "Light Mode" : "Dark Mode"}
  </button>
);
export default ThemeToggle;
