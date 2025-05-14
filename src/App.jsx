import "./App.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Welcome from "./pages/Welcome";
import Wip from "./pages/Wip";

function App() {
  const [isSearchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <Header setSearchOpen={setSearchOpen} isSearchOpen={isSearchOpen} />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route
          path="/app"
          element={
            <Home isSearchOpen={isSearchOpen} setSearchOpen={setSearchOpen} />
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
