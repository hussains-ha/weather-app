import Search from "../components/Search";

function Welcome(props) {
  return (
    <>
      <div className="site-content">
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
