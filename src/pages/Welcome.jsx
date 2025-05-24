import Search from "../components/Search";
import "./styles/Welcome.css";
import { useState } from "react";

const VITE_WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function Welcome(props) {
  const [buttonClicks, setButtonClicks] = useState(0);

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

  return (
    <>
      <div
        className={`site-content ${props.isSettingsOpen ? "blur" : ""}`}
        onClick={
          props.isSettingsOpen ? () => props.setSettingsOpen(false) : null
        }
      >
        <div className={`overlay ${props.isSettingsOpen ? "show" : ""}`}>
          {props.isSettingsOpen && settingsWindow}
        </div>
        <h1>weather</h1>
        <h2>Fast and Free Weather Data </h2>
        <Search
          setLoadingState={props.setLoadingState}
          loadingState={props.loadingState}
          weatherData={props.weatherData}
          setWeatherData={props.setWeatherData}
          setLocationName={props.setLocationName}
          units={props.units}
          setUnits={props.setUnits}
        />
      </div>
    </>
  );
}

export default Welcome;
