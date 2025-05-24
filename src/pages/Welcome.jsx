import Search from "../components/Search";
import "./styles/Welcome.css";

function Welcome(props) {
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
