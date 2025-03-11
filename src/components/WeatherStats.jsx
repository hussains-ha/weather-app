import "./styles/weatherStats.css";
import dayjs from "dayjs";
import moment from "moment-timezone";
import d2d from "degrees-to-direction";

function titleCase(str) {
  if (str !== undefined) {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
}

function WeatherStats(props) {
  const windNoGust = (
    <div className="weather-stat">
      <h3>Wind</h3>
      <h2 className="icon">{d2d(props.deg)}</h2>
      <p className="caption">{props.deg}°</p>
      <div className="wind-speed">
        <p>Gust 0</p>
        <p>Speed {props.speed}</p>
      </div>
      <p className="caption">In MPH</p>
    </div>
  );

  const windGust = (
    <div className="weather-stat">
      <h3>Wind</h3>
      <h2 className="icon">{d2d(props.deg)}</h2>
      <p className="caption">{props.deg}°</p>
      <div className="wind-speed">
        <p>Gust {props.gust}</p>
        <p>Speed {props.speed}</p>
      </div>
      <p className="caption">In MPH</p>
    </div>
  );

  const noRain = (
    <div className="weather-stat" id={props.type}>
      <h3>Precipitation</h3>
      <img src="/sun.max.svg" className="icon-img" alt="sunny"></img>
      <p>{titleCase(props.weatherDesc)}</p>
    </div>
  );

  const snow = (
    <div className="weather-stat" id={props.type}>
      <h3>Precipitation</h3>
      <img
        src="/cloud.snow.fill.svg"
        className="icon-img"
        alt={`${props.weatherDesc}`}
      ></img>
      <p>{titleCase(props.weatherDesc)}</p>
      <p>
        {props.general !== undefined && props.general.snow !== undefined
          ? props.general.snow["1h"]
          : 0}
      </p>
      <p className="caption">In Inches</p>
    </div>
  );

  const cloudy = (
    <div className="weather-stat" id={props.type}>
      <h3>Precipitation</h3>
      <img
        src="/cloudfill.svg"
        className="icon-img"
        alt={`${props.weatherDesc}`}
      ></img>
      <p>{titleCase(props.weatherDesc)}</p>
    </div>
  );
  const mist = (
    <div className="weather-stat" id={props.type}>
      <h3>Precipitation</h3>
      <img
        src="/cloud.fog.fill.svg"
        className="icon-img"
        alt={`${props.weatherDesc}`}
      ></img>
      <p>{titleCase(props.weatherDesc)}</p>
    </div>
  );

  if (props.type === "temperature") {
    return (
      <div className="weather-stat">
        <h3>Temperature</h3>
        <h2 className="icon">{props.temp | 0}°</h2>
        <div className="temp-range">
          <p>Low {props.low | 0}</p>
          <p>High {props.high | 0}</p>
        </div>
        <p>Feels Like {props.like | 0}</p>
        <p className="caption">In Fahrenheit</p>
      </div>
    );
  } else if (props.type === "precipitation") {
    if (props.weather === "Clear") {
      return noRain;
    } else if (props.weather === "Snow") {
      return snow;
    } else if (props.weather === "Clouds") {
      return cloudy;
    } else if (props.weather === "Mist" || props.weather === "Fog" || props.weather === "Smoke") {
      return mist;
    } else {
      return (
        <div className="weather-stat" id={props.type}>
          <h3>Precipitation</h3>
          <img
            src="/cloud.rain.fill.svg"
            className="icon-img"
            alt="rainy cloud"
          ></img>
          <p>Moderate Rain</p>
          <p>{props.precipitation}</p>
          <p className="caption">In Inches</p>
        </div>
      );
    }
  } else if (props.type === "humidity") {
    return (
      <div className="weather-stat">
        <h3>Humidity</h3>
        <h2 className="icon">{props.humidity}</h2>
        <p className="caption">Percent Humidity</p>
      </div>
    );
  } else if (props.type === "wind") {
    if (props.gust === undefined) {
      return windNoGust;
    } else {
      return windGust;
    }
  } else if (props.type === "sun") {
    const sunrise = dayjs.unix(props.sunrise).format("h:mm A");
    const sunset = dayjs.unix(props.sunset).format("h:mm A");
    const offsetHours = props.timezone / 3600;
    const time = moment().utcOffset(offsetHours * 60);
    return (
      <div className="weather-stat" id="sun">
        <h3>Sunrise & Sunset</h3>
        <p>Sunrise</p>
        <h2 className="icon">{sunrise}</h2>
        <p>Sunset</p>
        <h2 className="icon">{sunset}</h2>
        <p className="caption">
          Time Zone: {time.tz("America/New_York").format("z")}
        </p>
      </div>
    );
  } else if (props.type === "pressure") {
    return (
      <div className="weather-stat">
        <h3>Air Pressure</h3>
        <h2 className="icon">{props.pressure}</h2>
        <p className="caption">In hPa</p>
      </div>
    );
  } else {
    return (
      <div className="weather-stat">
        <h3>Error</h3>
      </div>
    );
  }
}

export default WeatherStats;
