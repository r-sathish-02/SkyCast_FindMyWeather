import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";

function Weather() {
  const { state } = useLocation();
  const city = state?.city;
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!city) return;
    const fetchWeather = async () => {
      try {
        const apiKey = "2fcdec5d5a06f421817563c34f154b2d";
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        setWeather(response.data);
      } catch (error) {
        setWeather({ error: "City not found or API error." });
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [city]);

  const temperatureFahrenheit = useMemo(() => {
    if (!weather?.main?.temp) return null;
    return ((weather.main.temp * 9) / 5 + 32).toFixed(2);
  }, [weather]);

  if (loading) return <div className="centered-container">Loading...</div>;
  if (!weather || weather.error)
    return <div className="centered-container">Error: {weather?.error || "No data."}</div>;

  return (
    <div className="centered-container">
      <h2>Weather in {weather.name}</h2>
      <p>Condition: {weather.weather[0].main}</p>
      <p>Temperature: {weather.main.temp} °C / {temperatureFahrenheit} °F</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind Speed: {weather.wind.speed} m/s</p>
    </div>
  );
}

export default Weather;
