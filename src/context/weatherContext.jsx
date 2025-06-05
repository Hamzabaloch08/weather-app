import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create context
export const weatherContext = createContext({
  weatherData: null,
  error: null,
  fetchWeather: () => {},
});

// Custom hook
export const useWeather = () => useContext(weatherContext);

// Provider
export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = async (cityName) => {
    setError(null);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      setWeatherData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      setWeatherData(null);
    }
  };

  const getWeatherByLocation = async (latitude, longitude) => {
    setError(null);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      setError("Couldn't fetch location weather.");
      setWeatherData(null);
    }
  };


  useEffect(() => {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        getWeatherByLocation(latitude, longitude); // ✅ Location allowed
      },
      (error) => {
        console.log("Location access denied. Loading Karachi as fallback.");
        fetchWeather("karachi");
      }
    );
  } else {
    fetchWeather("karachi");
  }

  }, []);

  return (
    <weatherContext.Provider
      value={{ weatherData, error, fetchWeather, getWeatherByLocation }}
    >
      {children}
    </weatherContext.Provider>
  );
};
