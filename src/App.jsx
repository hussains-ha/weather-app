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
  const [loadingState, setLoadingState] = useState("idle");
  const [weatherData, setWeatherData] = useState({});
  const [locationName, setLocationName] = useState("");

  return (
    <>
      <Header
        setSearchOpen={setSearchOpen}
        isSearchOpen={isSearchOpen}
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
