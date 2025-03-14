import "./styles/Home.css";
import Stats from "../components/WeatherStats";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const VITE_WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function Home(props) {
  const location = useLocation();
  const [weatherData, setWeatherData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {}, [props.isSearchOpen]);

  useEffect(() => {
    if (!location.state) {
      navigate("/");
      return;
    }

    async function fetchWeather() {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.state.data.lat}&lon=${location.state.data.lon}&appid=${VITE_WEATHER_API_KEY}&units=imperial`
      );
      const data = await response.json();
      setWeatherData(data);
    }
    fetchWeather();
  }, [location]);

  if (!location.state) {
    navigate("/");
    return;
  }

  if (weatherData.weather !== undefined) {
    return (
      <>
        <div className="site-content">
          <h1>
            <a href="/">weather</a>
          </h1>
          <h2>{location.state.data.location}</h2>
          {/* <div className="hour-forecast">
          <WeatherImage />
          <WeatherImage />
          <WeatherImage />
          <WeatherImage />
          <WeatherImage />
          <WeatherImage />
          <WeatherImage />
        </div> */}

          <div className="weather-stats">
            <Stats
              type="temperature"
              temp={weatherData.main?.temp}
              low={weatherData.main?.temp_min}
              high={weatherData.main?.temp_max}
              like={weatherData.main?.feels_like}
            />
            <Stats
              type="precipitation"
              precipitation={weatherData.rain?.["1h"]}
              weather={weatherData.weather[0].main}
              weatherDesc={weatherData.weather[0]?.description}
              general={weatherData}
            />
            <Stats type="humidity" humidity={weatherData.main?.humidity} />
            <Stats
              type="wind"
              deg={weatherData.wind?.deg}
              gust={weatherData.wind?.gust}
              speed={weatherData.wind?.speed}
            />
            <Stats
              type="sun"
              sunrise={weatherData.sys?.sunrise}
              sunset={weatherData.sys?.sunset}
              timezone={weatherData.timezone}
            />
            <Stats type="pressure" pressure={weatherData.main?.pressure} />
          </div>
        </div>
      </>
    );
  } else {
    return <h2>Loading...</h2>;
  }
}

export default Home;
