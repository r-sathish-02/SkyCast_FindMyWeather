import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Weather.css';

const Weather = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const city = location.state?.city;

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = '91a1dcf844967b00c27d548af8e7fcda'; 
  useEffect(() => {
    if (!city) {
      navigate('/');
      return;
    }

    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        setWeather(response.data);
      } catch (error) {
        alert("Failed to fetch weather data.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city, navigate]);

  const tempInFahrenheit = useMemo(() => {
    if (!weather) return null;
    return (weather.main.temp * 9) / 5 + 32;
  }, [weather]);

  if (loading) return <div className="weather-container">Loading...</div>;
  if (!weather) return null;

  return (
    <div className="weather-container">
      <h2>Weather in {weather.name}</h2>
      <p>Condition: {weather.weather[0].description}</p>
      <p>Temperature: {weather.main.temp} °C / {tempInFahrenheit.toFixed(2)} °F</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind Speed: {weather.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;
