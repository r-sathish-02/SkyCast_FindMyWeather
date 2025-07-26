# SkyCast - Find My Weather
## Date:25-07-2025
## Objective:
To build a responsive single-page application using React that allows users to enter a city name and retrieve real-time weather information using the OpenWeatherMap API. This project demonstrates the use of Axios for API calls, React Router for navigation, React Hooks for state management, controlled components with validation, and basic styling with CSS.
## Tasks:

#### 1. Project Setup
Initialize React app.

Install necessary dependencies: npm install axios react-router-dom

#### 2. Routing
Set up BrowserRouter in App.js.

Create two routes:

/ – Home page with input form.

/weather – Page to display weather results.

#### 3. Home Page (City Input)
Create a controlled input field for the city name.

Add validation to ensure the input is not empty.

On valid form submission, navigate to /weather and store the city name.

#### 4. Weather Page (API Integration)
Use Axios to fetch data from the OpenWeatherMap API using the city name.

Show temperature, humidity, wind speed, and weather condition.

Convert and display temperature in both Celsius and Fahrenheit using useMemo.

#### 5. React Hooks
Use useState for managing city, weather data, and loading state.

Use useEffect to trigger the Axios call on page load.

Use useCallback to optimize form submit handler.

Use useMemo for temperature conversion logic.

#### 6. UI Styling (CSS)
Create a responsive and clean layout using CSS.

Style form, buttons, weather display cards, and navigation links.

## Programs:
App.js:
```
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Weather from './pages/Weather';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </Router>
  );
}
```
Home.js:
```
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (city.trim() === '') {
      setError('City name is required.');
    } else {
      setError('');
      navigate('/weather', { state: { city } });
    }
  }, [city, navigate]);

  return (
    <div className="home-container">
      <h1>SkyCast</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Home;
```
Weather.js:
```
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
```
Home.css:
```
.home-container {
  text-align: center;
  margin-top: 100px;
}

input {
  padding: 10px;
  width: 250px;
  font-size: 16px;
  margin-right: 10px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.error {
  color: red;
  margin-top: 10px;
}
```
Weather.css:
```
.weather-container {
  text-align: center;
  margin-top: 80px;
}

.weather-container p {
  font-size: 18px;
  margin: 10px 0;
}
```

export default App;

## Output:
<img width="1918" height="957" alt="image" src="https://github.com/user-attachments/assets/ab202c25-215d-465b-b496-37201edba021" />
<img width="1918" height="968" alt="image" src="https://github.com/user-attachments/assets/8f6477d5-d2ae-4364-ada1-1dfa0c158bfc" />


## Result:
A responsive single-page application using React that allows users to enter a city name and retrieve real-time weather information using the OpenWeatherMap API has been built successfully. 
