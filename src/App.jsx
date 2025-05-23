import "./App.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Background from "./components/Background";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Welcome from "./pages/Welcome";
import Wip from "./pages/Wip";

function App() {
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [loadingState, setLoadingState] = useState("Idle");
  const [weatherData, setWeatherData] = useState({});
  const [locationName, setLocationName] = useState("");
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [units, setUnits] = useState(() => { 
    const savedUnits = localStorage.getItem("unitPreference");
    return savedUnits ? JSON.parse(savedUnits) : "Imperial";
  });

  return (
    <>
      <Header
        setSearchOpen={setSearchOpen}
        isSearchOpen={isSearchOpen}
        setSettingsOpen={setSettingsOpen}
        isSettingsOpen={isSettingsOpen}
        loadingState={loadingState}
      />
      <Background />
      <Routes>
        <Route
          path="/"
          element={
            <Welcome
              setLoadingState={setLoadingState}
              loadingState={loadingState}
              weatherData={weatherData}
              setWeatherData={setWeatherData}
              locationName={locationName}
              setLocationName={setLocationName}
              isSettingsOpen={isSettingsOpen}
              setSettingsOpen={setSettingsOpen}
              units={units}
              setUnits={setUnits}
            />
          }
        />
        <Route
          path="/app"
          element={
            <Home
              isSearchOpen={isSearchOpen}
              setSearchOpen={setSearchOpen}
              loadingState={loadingState}
              setLoadingState={setLoadingState}
              weatherData={weatherData}
              setWeatherData={setWeatherData}
              locationName={locationName}
              setLocationName={setLocationName}
              isSettingsOpen={isSettingsOpen}
              setSettingsOpen={setSettingsOpen}
              units={units}
              setUnits={setUnits}
            />
          }
        />
        <Route path="/wip" element={<Wip />} />
        <Route path="*" element={<Welcome />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
