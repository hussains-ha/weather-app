import "./styles/search.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const geocodeApiKey = import.meta.env.VITE_GEOCODING_API_KEY;
const VITE_WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function Search(props) {
  const [location, setlocation] = useState("");
  const navigate = useNavigate();
  const loc = useLocation();
  const isAppPage = loc.pathname.includes("/app");

  async function fetchGeoData() {
    if (!location) {
      props.setLoadingState("Null Client Error");
      return;
    }
    const response = await fetch(
      `https://geocode.maps.co/search?q=${location}}&api_key=${geocodeApiKey}`
    );
    const data = await response.json();
    return data;
  }

  async function fetchWeather(data) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=${VITE_WEATHER_API_KEY}&units=imperial`
    );
    const d = await response.json();
    props.setWeatherData(d);
    props.setLocationName(data.display_name);
    props.setLoadingState("Success");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.setLoadingState("loading");

    if (isAppPage && props.setSearchOpen) {
      props.setSearchOpen(false);
    }

    fetchGeoData()
      .then((data) => {
        if (data.length === 0) {
          props.setLoadingState("Client Error");
          return;
        }
        const locationData = data[0];
        fetchWeather(locationData);
        setlocation("");
        navigate("/app");
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        if (!location) {
          props.setLoadingState("Null Client Error");
        } else {
          props.setLoadingState("Network Error");
        }
        console.log(props.loadingState);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="search"
        type="text"
        placeholder="Enter Location"
        onChange={(e) => setlocation(e.target.value)}
      ></input>

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

      {props.loadingState === "Client Error" && (
        <h3 id="error">
          There was a problem with your request. Please check your input and try
          again.
        </h3>
      )}
    </form>
  );
}

export default Search;
