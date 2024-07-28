import "./App.css";
import { useState, useEffect } from "react";

function App() {
  let [location, setLocation] = useState("");
  let [weather, setWeather] = useState(null);
  let [isLoading, setIsLoading] = useState(false);

  async function current() {
    try {
      setIsLoading(true);
      let response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=fdb5d228987f4d95baa120356242904&q=${location}&aqi=no`
      );
      // tried using ${process.env.REACT_APP_WEATHER_KEY} in API instead of key, but didn't work

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      let data = await response.json();
      setWeather(data);
    } catch (error) {
      console.log("Error fetching data", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleLoad = () => {
    if (location.trim() !== "") {
      current();
    }
  };

  //useEffect to reload when location changes
  // useEffect(() => {
  //   if (location) {
  //     current(location);
  //   }
  // }, [location]);

  return (
    <div className="App">
      <h1 className="header">Weather across the globe</h1>

      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter city name here"
      />

      <button className="button" onClick={handleLoad}>
        Load
      </button>

      {isLoading ? (
        <p>Loading...</p>
      ) : /* if both weather and weather.current is true the temp and others show */
      weather && weather.current ? (
        <>
          <div className="flex">
            <p>Temp: {weather.current.temp_c} C</p>
            <p>Feels like: {weather.current.feelslike_c} C</p>
          </div>
          <div className="flex">
            <p>Condition: {weather.current.condition.text}</p>
            <p>UV index: {weather.current.uv}</p>
          </div>
          <div className="flex">
            <p>Wind Speed: {weather.current.wind_kph} kph</p>
            <p>Wind Direction: {weather.current.wind_dir}</p>
          </div>
          <div className="flex">
            <p>Clouds: {weather.current.cloud}</p>
            <p>Humidity: {weather.current.humidity} %</p>
          </div>
        </>
      ) : (
        <p className="text">
          Enter a city name and click Load to see the weather.
        </p>
      )}
    </div>
  );
}

export default App;
