import "./styles/Home.css";
import Stats from "../components/WeatherStats";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import Search from "../components/Search";

function Home(props) {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Weather Data: ", props.weatherData);
    if (props.loadingState === "Success" && Object.keys(props.weatherData).length === 0) {
      navigate("/");
    }
  }, [props.weatherData, props.loadingState, navigate]);

  if (
    Object.keys(props.weatherData).length !== 0 &&
    (props.loadingState === "Success" || props.loadingState === "idle")
  ) {
    return (
      <>
        <div
          className={`site-content ${props.isSearchOpen ? "blur" : ""}`}
          onClick={props.isSearchOpen ? () => props.setSearchOpen(false) : null}
        >
          <div className={`overlay ${props.isSearchOpen ? "show" : ""}`}>
            {props.isSearchOpen && (
              <div
                className="overlay-content"
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
                />
                <button
                  onClick={() => {
                    props.setSearchOpen(false);
                  }}
                >
                  Close
                </button>
              </div>
            )}
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
  } else {
    navigate("/");
  }
}

export default Home;
