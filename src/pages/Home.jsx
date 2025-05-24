import "./styles/Home.css";
import Stats from "../components/WeatherStats";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Search from "../components/Search";

const VITE_WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function Home(props) {
  const navigate = useNavigate();
  const [buttonClicks, setButtonClicks] = useState(0);

  const searchWindow = (
    <div
      className="search-overlay-content"
      onClick={(e) => e.stopPropagation()}
    >
      <h1>Location Search</h1>
      <Search
        setSearchOpen={props.setSearchOpen}
        loadingState={props.loadingState}
        setLoadingState={props.setLoadingState}
        weatherData={props.weatherData}
        setWeatherData={props.setWeatherData}
        setLocationName={props.setLocationName}
        units={props.units}
        setUnits={props.setUnits}
      />
      <button
        onClick={() => {
          props.setSearchOpen(false);
        }}
        id="close"
      >
        Close
      </button>
    </div>
  );

  const settingsWindow = (
    <div
      className="settings-overlay-content"
      onClick={(e) => e.stopPropagation()}
    >
      <h1>Sett   ings</h1>

      <button
        onClick={() => {
          if (props.units === "Metric") {
            props.setUnits("Imperial");
            localStorage.setItem("unitPreference", JSON.stringify("Imperial"));
          } else {
            props.setUnits("Metric");
            localStorage.setItem("unitPreference", JSON.stringify("Metric"));
          }
          setButtonClicks((prev) => prev + 1);
          console.log(props.weatherData);
        }}
      >
        <h3>{`Units: ${props.units}`}</h3>
      </button>
      <button>
        <h3>Set Time Zone</h3>
      </button>
      <button>
        <h3>Set Default Location</h3>
      </button>
      <button
        onClick={() => {
          props.setSettingsOpen(false);
          if (buttonClicks % 2 === 1) {
            props.setLoadingState("loading");
            fetchWeather(props.weatherData).catch((error) => {
              console.error("Error fetching weather data:", error);
              if (!props.locationName) {
                props.setLoadingState("Null Client Error");
              } else {
                props.setLoadingState("Network Error");
              }
            });
          }
          setButtonClicks(0);
        }}
        id="close"
      >
        Close
      </button>
    </div>
  );

  async function fetchWeather(data) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${VITE_WEATHER_API_KEY}&units=${props.units}`
      );
      const d = await response.json();
      if (!d) {
        props.setLoadingState("Client Error");
        return;
      }
      props.setWeatherData(d);
      props.setLoadingState("Success");
    } catch (error) {
      console.error("Error fetching weather data:", error);
      if (!props.locationName) {
        props.setLoadingState("Null Client Error");
      } else {
        props.setLoadingState("Network Error");
      }
    }
  }

  useEffect(() => {
    if (
      (props.loadingState === "Success" || props.loadingState === "Idle") &&
      Object.keys(props.weatherData).length === 0
    ) {
      navigate("/");
    }
  }, [props.weatherData, props.loadingState, navigate]);

  if (
    Object.keys(props.weatherData).length !== 0 &&
    (props.loadingState === "Success" || props.loadingState === "Idle")
  ) {
    return (
      <>
        <div
          className={`site-content ${
            props.isSearchOpen ? "blur" : props.isSettingsOpen ? "blur" : ""
          }`}
          onClick={
            props.isSearchOpen
              ? () => props.setSearchOpen(false)
              : props.isSettingsOpen
              ? () => props.setSettingsOpen(false)
              : null
          }
        >
          <div
            className={`overlay ${
              props.isSearchOpen ? "show" : props.isSettingsOpen ? "show" : ""
            }`}
          >
            {props.isSearchOpen && searchWindow}

            {props.isSettingsOpen && settingsWindow}
          </div>
          <h1>
            <Link to="/">weather</Link>
          </h1>
          <h2>{props.locationName}</h2>

          <div className="weather-stats">
            <Stats
              type="temperature"
              temp={props.weatherData.main?.temp}
              low={props.weatherData.main?.temp_min}
              high={props.weatherData.main?.temp_max}
              like={props.weatherData.main?.feels_like}
              units={props.units}
            />
            <Stats
              type="precipitation"
              precipitation={props.weatherData.rain?.["1h"]}
              weather={props.weatherData.weather[0]?.main}
              weatherDesc={props.weatherData.weather[0]?.description}
              general={props.weatherData}
            />
            <Stats
              type="humidity"
              humidity={props.weatherData.main?.humidity}
            />
            <Stats
              type="wind"
              deg={props.weatherData.wind?.deg}
              gust={props.weatherData.wind?.gust}
              speed={props.weatherData.wind?.speed}
              units={props.units}
            />
            <Stats
              type="sun"
              sunrise={props.weatherData.sys?.sunrise}
              sunset={props.weatherData.sys?.sunset}
              timezone={props.weatherData.timezone}
            />
            <Stats
              type="pressure"
              pressure={props.weatherData.main?.pressure}
            />
          </div>
        </div>
      </>
    );
  } else if (props.loadingState !== "Sucess" || props.loadingState !== "Idle") {
    return (
      <>
        <div
          className={`site-content ${
            props.isSearchOpen ? "blur" : props.isSettingsOpen ? "blur" : ""
          }`}
          onClick={
            props.isSearchOpen
              ? () => props.setSearchOpen(false)
              : props.isSettingsOpen
              ? () => props.setSettingsOpen(false)
              : null
          }
        >
          <div
            className={`overlay ${
              props.isSearchOpen ? "show" : props.isSettingsOpen ? "show" : ""
            }`}
          >
            {props.isSearchOpen && searchWindow}

            {props.isSettingsOpen && settingsWindow}
          </div>

          <h1>
            <Link to="/">weather</Link>
          </h1>

          {props.loadingState === "Network Error" && (
            <h3 id="error">Please check your internet connection and retry.</h3>
          )}

          {props.loadingState === "Null Client Error" && (
            <h3 id="error">Please enter a location.</h3>
          )}

          {props.loadingState === "Server Error" && (
            <h3 id="error">
              Our servers are overloaded. Please try again momentarily.
            </h3>
          )}
        </div>
      </>
    );
  }
}

export default Home;
