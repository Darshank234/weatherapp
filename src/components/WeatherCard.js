import { WiThermometer, WiStrongWind, WiHumidity, WiBarometer, WiTime3 } from "react-icons/wi";

const WeatherCard = ({ weatherData, darkMode }) => {
  const { location, current } = weatherData;
  return (
    <div
      style={{
        marginTop: "20px",
        padding: "1rem",
        borderRadius: "10px",
        backgroundColor: darkMode ? "#444" : "#f0f0f0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "90%",
        maxWidth: "400px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <h2>
        {location.name}, {location.country}
        <img src={current.weather_icons[0]} alt={current.weather_descriptions[0]} style={{ width: "80px", height: "80px" }} />
      </h2>
      <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{current.weather_descriptions[0]}</p>
      <p style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <WiThermometer size={24} /> Temperature: {current.temperature} °C
      </p>
      <p style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <WiHumidity size={24} /> Humidity: {current.humidity} %
      </p>
      <p style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <WiStrongWind size={24} /> Wind Speed: {current.wind_speed} km/h
      </p>
      <p style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <WiBarometer size={24} /> Pressure: {current.pressure} hPa
      </p>
      <p style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <WiTime3 size={24} /> Local Time: {location.localtime}
      </p>
    </div>
  );
};
export default WeatherCard;
