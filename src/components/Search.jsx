import "./styles/search.css";
import { useState } from "react";
import { useNavigate } from "react-router";
const geocodeApiKey = import.meta.env.VITE_GEOCODING_API_KEY;

function Search() {
  const [location, setlocation] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!location) {
      console.log("Please enter a location");
      return;
    }

    console.log("searching for location");
    fetch(
      `https://geocode.maps.co/search?q=${location}}&api_key=${geocodeApiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        navigate("/app", {
          state: {
            data: {
              location: data[0].display_name,
              lat: data[0].lat,
              lon: data[0].lon,
            },
          },
        });
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
    </form>
  );
}

export default Search;
